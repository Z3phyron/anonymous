const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  CreateSecret,
  AllUserSecrets,
} = require("../controller/secretCtrl");

router.route("/").get(protect, AllUserSecrets);
router.route("/:user").post( CreateSecret)


module.exports = router;
