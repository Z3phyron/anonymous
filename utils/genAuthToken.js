const jwt = require("jsonwebtoken");

const genAuthToken = (user) => {
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign(user, secret);
  return token;
};

module.exports = genAuthToken;
