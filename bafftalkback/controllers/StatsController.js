const User = require("../models/User");
const Group = require("../models/Group");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.getStats = async (req, res) => {
  try {
    const [users, groups, comments, posts] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Group.countDocuments(),
      Comment.countDocuments(),
      Post.countDocuments(),
    ]);
    res.status(200).json({ users, groups, comments, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while fetching all stats");
  }
};
exports.Top3Users = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "maker",
          as: "posts",
        },
      },
      { $addFields: { postCount: { $size: "$posts" } } },
      { $sort: { postCount: -1 } },
      { $limit: 3 },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          postCount: 1,
          avatar:1,
        },
      },
    ]);

    if (users.length === 0) {
      return res.status(404).json("No users found");
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("An error occurred while fetching top 3 users");
  }
};
