const User = require("../models/User");
const Group = require("../models/Group");
const Comment = require("../models/Comment");
const Post = require("../models/Post");


exports.getStats = async (req,res) => {
    try {
        const [users,groups,comments,posts] = await Promise.all([
            User.countDocuments({role: "user"}),
            Group.countDocuments(),
            Comment.countDocuments(),
            Post.countDocuments()
        ]);
        res.status(200).json({users,groups,comments,posts});
        

    }
     catch(error) {
        console.log(error);
        res.status(500).json("An error occurred while fetching all stats");
     }
}
