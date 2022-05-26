const User = require("../model/User");
const asyncHandler = require("express-async-handler");

// get all users
const AllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find().select(
      "profile_pic firstName lastName followers followings"
    );
    if (!allUsers) {
      res.status(500);
      throw new Error("somthing went wrong !!");
    }

    //return users without signed user

    const randUsers = allUsers.filter(
      (user) => user._id.toString() !== req.user._id.toString()
    );
    return res.status(200).json(randUsers);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//update user
const UpdateUser = asyncHandler(async (req, res) => {
  const currentUser = req.params.id;

  try {
    if (req.user._id.toString() === currentUser || req.body.isAdmin) {
      const user = await User.findByIdAndUpdate(currentUser, {
        $set: req.body,
      });
      const token = user.generateAuthToken();
      res.status(200).json({ user: user, token: token });
    } else {
      res.status(403);
      throw new Error("you can only update your account");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// delete user
const DeleteUser = asyncHandler(async (req, res) => {
  const currentUser = req.params.id;
  try {
    if (req.user._id.toString() === currentUser || req.body.isAdmin) {
      await User.findByIdAndDelete(currentUser);
      res.status(200).json("Account has been deleted");
    } else {
      res.status(403);
      throw new Error("You can delete only your account!");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//get followings
const GetFollowings = asyncHandler(async (req, res) => {
  const currentUser = req.user._id.toString();
  try {
    const user = await User.findById(currentUser);

    console.log(user);
    const followings = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let followingList = [];
    followings.map((friend) => {
      const { _id, firstName, lastName, profile_pic } = friend;
      friendList.push({ _id, firstName, lastName, profile_pic });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500);
    throw new Error("server error", error);
  }
});

// follow user

const FollowUser = asyncHandler(async (req, res) => {
  const currentUser = req.user._id.toString();
  const userId = req.params.id;

  try {
    if (currentUser !== userId) {
      res.status(403);
      throw new Error("you cant follow urself dummy!!");
    }

    const user = await User.findById(currentUser);
    const userToBeFollowed = await User.findById(userId);
    if (!userToBeFollowed.followers.includes(currentUser)) {
      await userToBeFollowed.updateOne({
        $push: { followers: currentUser },
      });
      await user.updateOne({
        $push: { following: userId },
      });
      //  const friends = await currentUser.following;
      //  console.log(friends);
      res.status(200).json("user has been followed");
    } else if (userToBeFollowed.followers.includes(currentUser)) {
      await userToBeFollowed.updateOne({
        $pull: { following: currentUser },
      });
      await currentUser.updateOne({
        $pull: { followers: userId },
      });

      res.status(200).json("user has been unfollowed");
    }
  } catch (error) {
    res.status(500);
    throw new Error("server error", error);
  }
});

// get following user
const GetFollowing = asyncHandler(async (req, res) => {
  const currentUser = req.user._id.toString();
  const userId = req.params.id;
  try {
    const user = await User.findById(currentUser);
    const friendId = await User.findById(userId);

    if (user !== friendId) {
      const friend = await currentUser.following.populate(
        "user",
        "userName profile_pic"
      );
    }

    res.status(200).json(friend);
  } catch (error) {
    res.status(500);
    throw new Error("server error", error);
  }
});

module.exports = {
  UpdateUser,
  DeleteUser,
  FollowUser,
  AllUsers,

  GetFollowing,
  GetFollowings,
};
