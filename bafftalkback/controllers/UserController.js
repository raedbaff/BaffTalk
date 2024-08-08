const { getBucket } = require("../middleware/db");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uploadFileToBucket = require("../utils/helperFunctions");
const mongoose = require("mongoose");

exports.getUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ googleId: id }).populate([
      { path: "posts", strictPopulate: false },
    ]);

    if (!user) {
      return res.status(404).json(`User with ${id} not found`);
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while fetching user information");
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json("No users found");
    }
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while fetching all users");
  }
};
exports.RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("Please provide all required fields");
    }
    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res.status(400).json("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
exports.RegisterAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("Please provide all required fields");
    }
    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res.status(400).json("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
exports.UpdateProfilePicture = async (req, res) => {
  try {
    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json("Bucket not initialized");
    }

    const { id } = req.params;
    const newAvatar = req.file;
    if (!id) {
      return res.status(400).json("Please provide a user id");
    }
    if (!newAvatar) {
      return res.status(400).json("Please provide an image");
    }

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json("User not found");
    }

    const newAvatarId = await uploadFileToBucket(newAvatar);
    userToUpdate.avatar = `http://localhost:4000/user/avatar/${newAvatarId}`;
    await userToUpdate.save();
    res.status(200).json(userToUpdate);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
exports.FetchUserAvatar = async (req, res) => {
  try {
    const { avatarId } = req.params;
    if (!avatarId) {
      return res.status(400).json("Please provide a user id");
    }
    const avatarIdObject = new mongoose.Types.ObjectId(avatarId);

    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json("Bucket not initialized");
    }
    const avatarStream = bucket.openDownloadStream(avatarIdObject);
    avatarStream.pipe(res);
    avatarStream.on("error", (error) => {
      res.status(500).json(error.message);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
exports.GetUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json("Please provide a user id");
    }
    const userIdObject = new mongoose.Types.ObjectId(userId);

    const user = await User.aggregate([
      { $match: { _id: userIdObject } },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "maker",
          as: "posts",
        },
      },
      {
        $unwind: {
          path: "$posts",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          username: { $first: "$username" },
          email: { $first: "$email" },
          avatar: { $first: "$avatar" },
          friends: { $first: "$friends" },
          links: { $first: "$links" },
          role: { $first: "$role" },
          posts: { $push: "$posts" },
        },
      },
    ]);
    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
