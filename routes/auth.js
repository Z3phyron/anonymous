const express = require("express")

const router = express.Router()

const {
  SignUpUser,
  SignInUser,
  forgotPassword,
  resetPassword,
  verifyToken,
  VerifyMail,
} = require("../controller/authCtrl");

router.post("/", SignUpUser);
router.post("/login", SignInUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
router.get("/verifyToken", verifyToken);
router.put("/:id/verify/:token/", VerifyMail);

module.exports = router