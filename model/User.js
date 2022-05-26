const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passwordComplexity = require("joi-password-complexity");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      userName: this.userName,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7h" }
  );
  return token;
};

const validate = (user) => {
  const schema = Joi.object({
    userName: Joi.string().min(4).max(10).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
  });
  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);
module.exports = {User, validate };
