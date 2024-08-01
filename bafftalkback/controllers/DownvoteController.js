const Downvote = require("../models/Downvote");
const Upvote = require("../models/Upvote");
const Post = require("../models/Post");

exports.createDownvote = async (req, res) => {
  try {
    const { post, downvoter } = req.body;

    if (!post || !downvoter) {
      return res
        .status(400)
        .json({ error: "Please provide post and downvoter" });
    }

    const relatedPost = await Post.findById(post);
    if (!relatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newDownvote = new Downvote({ post, downvoter });

    const upvoteExists = await Upvote.findOne({ post, upvoter: downvoter });

    const downvoteExists = await Downvote.findOne({ post, downvoter });
    if (downvoteExists) {
      relatedPost.downvotes = relatedPost.downvotes.filter(
        (downvote) =>
          downvote.toString() !== downvoteExists.downvoter.toString()
      );
      await relatedPost.save();
      await Downvote.findByIdAndDelete(downvoteExists._id);
      return res.status(200).json({ message: "Downvote removed" });
    } else {
      relatedPost.downvotes.push(newDownvote.downvoter);
      upvoteExists
        ? (relatedPost.upvotes = relatedPost.upvotes.filter(
            (upvote) => upvote.toString() !== upvoteExists.upvoter.toString()
          ))
        : null;
      upvoteExists ? await Upvote.findByIdAndDelete(upvoteExists._id) : null;
      await relatedPost.save();
      await newDownvote.save();
      return res.status(201).json({ message: "Downvote created" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
