const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const validObjId = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    throw new Error("Invalid id");
  }
  next();
});

module.exports = { validObjId };
