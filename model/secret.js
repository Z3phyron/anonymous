const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const secretSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    secret: {
      type: String,
      max: 500,
    },
  },
  { timestamps: true }
);


const Secret = mongoose.model("Secret", secretSchema);
module.exports = { Secret };