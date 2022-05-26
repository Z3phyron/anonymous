const { User } = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

const { SendMail } = require("../utils/sendMail");
const Token = require("../model/token");

const mailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

// @desc    Register new user
// @route   POST /api/auth
// @access  Public
const SignUpUser = asyncHandler(async (req, res) => {
  const { userName, email, gender, password } = req.body;

  const { error } = User.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  try {
    let existingUser;

    existingUser = await User.findOne({ userName: userName, email: email });

    if (existingUser) {
      res.status(403);
      throw new Error(
        "User with email/userName already exists!!! \n Please enter a unique username / email of your own"
      );
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = new User({
      userName,
      email,
      gender,
      password: hashedPassword,
    });

    await user.save();

    //create email verification token
    const mailToken = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    //

    //email verification link
    const BaseUrl = process.env.BASE_URL;
    const userId = user._id;
    const vToken = mailToken.token;
    const url = `${BaseUrl}mail/${userId}/verify/${vToken}`;
    //

    // Send the email
    await SendMail(email, "Verify Email", url);
    //

    const token = user.generateAuthToken();

    user.password = undefined;
    user.__v = undefined;

    res.status(201).json({ user: user, token: token });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Sign in user
// @route   POST /api/auth/signIn
// @access  Public
const SignInUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  try {
    let existingUser;

    existingUser = await User.findOne({ userName: userName });

    if (!existingUser) {
      res.status(400);
      throw new Error("User not found");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      res.status(400);
      throw new Error("invalid password");
    }

    // check to see if userEmail is verified
    if (!existingUser.verified) {
      // find verification  token
      let token = await Token.findOne({
        userId: existingUser._id,
      });

      if (!token) {
        //create email verification token
        const mailToken = await new Token({
          userId: existingUser._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        //

        //email verification link
        const BaseUrl = process.env.BASE_URL;
        const userId = existingUser._id;
        const vToken = mailToken.token;
        const url = `${BaseUrl}mail/${userId}/verify/${vToken}`;
        const email = existingUser.email;
        //

        // Send the email
        await SendMail(email, "Verify Email", url);
        //
      }
      res.status(400);
      throw new Error("an email has been sent to ur account");
    }

    existingUser.password = undefined;
    existingUser._v = undefined;

    const token = existingUser.generateAuthToken();

    res.status(201).json({
      user: existingUser,
      token: token,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      res.status(403);
      throw new Error("please fill in all fields");
    } else if (!mailRegex.test(email)) {
      res.status(403);
      throw new Error("invalid email");
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      res.status(403);
      throw new Error("User not found");
    }

    //reset password link
    const BaseUrl = process.env.BASE_URL;
    const token = existingUser.generateAuthToken();
    const url = `${BaseUrl}reset/${token}/password`;
    //

    // Send the email
    await SendMail(email, "Reset Password", url);
    //

    // SENDING THE MAIL
    if (!SendMail) {
      res.status(403);
      throw new Error("error sending mail");
    } else {
      res.status(201).json({
        success: true,
        msg: "sent successfully",
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const verifyToken = asyncHandler(async (req, res) => {
  const token = req.query.token;

  try {
    if (!token) {
      return res.status(404).json({
        success: false,
        msg: "invalid Token",
      });
    }

    //decode d token
    let decodeToken;
    try {
      decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }

    console.log(decodeToken);

    const existingUser = await User.findOne({
      email: decodeToken.email,
    });

    if (!existingUser) {
      res.status(400);
      throw new Error("User does not exist");
    }

    const email = decodeToken.email;

    res.status(200).json(email);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  // console.log(email)

  // try {
  const existingUser = await User.find({ email: email });
  console.log(existingUser);

  if (!existingUser) {
    res.status(400);
    throw new Error("User with this email not found");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  res.status(200).json({
    success: true,
    msg: "Reset Successful",
  });
  // } catch (error) {
  //   res.status(500);
  //   throw new Error(error);
  // }
});

// @desc    Verify Email
// @route   PUT/api/users
// @access  Public
const VerifyMail = asyncHandler(async (req, res) => {
  const { id, token } = req.params;

  let user = await User.findOne({ _id: id });

  // console.log(user);
  if (!user) {
    res.status(400);
    throw new Error("Invalid Link");
  }

  // console.log(user)
  const verificationToken = await Token.findOne({
    userId: user._id,
    token: token,
  });

  if (!verificationToken) {
    res.status(400);
    throw new Error("Invalid Link");
  }

  await User.updateOne({
    _id: user._id,
    verified: true,
  });
  await verificationToken.remove();

  user = await User.findOne({ _id: id });

  res.status(200).json({
    message: "User Verified Successfully",
  });
});

module.exports = {
  SignUpUser,
  SignInUser,
  forgotPassword,
  resetPassword,
  verifyToken,
  VerifyMail,
};
