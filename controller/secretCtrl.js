const { Secret } = require("../model/secret");
const { User } = require("../model/User");
const asyncHandler = require("express-async-handler");

// create new secret

const CreateSecret = asyncHandler(async (req, res) => {
  const { secret } = req.body;
  const { user } = req.params;

  // try {
    const userExists = await User.findOne({ userName: user });
    console.log(userExists)

    if (!userExists) {
      res.status(403);
      throw new Error("sorry this user does not exists on our platform!!!");
    }

    if (!secret) {
      res.status(403);
      throw new Error("please add some comment");
    }

    let newSecret = new Secret({
      secret: secret,
      userId: userExists._id,
    });

    await newSecret.save();

    newSecret.__v = undefined;

    return res.status(201).json(newSecret);

});

// all secret made by user
const AllUserSecrets = asyncHandler(async (req, res) => {
  const currentUser = req.user
  console.log(currentUser
  )
  try {
    const Secrets = await Secret.find({ userId: currentUser });

    res.status(201).json(Secrets);
  } catch (error) {
    res.status(500);
    throw new Error("server error");
  }
});

module.exports = {
  CreateSecret,
  AllUserSecrets,
};
