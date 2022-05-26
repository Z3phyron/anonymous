const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  UpdateUser,
  DeleteUser,
  FollowUser,
  AllUsers,
  GetFollowing,
  GetFollowings,
} = require("../controller/userCtrl");

router.get("/", protect, AllUsers);
router.put("/:id", protect, UpdateUser);
router.put("/followUser/:id", protect, FollowUser);
router.delete("/:id", protect, DeleteUser);
router.get("/friends", protect, GetFollowings);
router.get("/friend/:id", protect, GetFollowing);

module.exports = router;
