const Post = require("../models/Post");
const Upvote = require("../models/Upvote");

exports.createUpvote = async (req, res) => {
  try {
    const { post, upvoter } = req.body;
    if (!post || !upvoter) {
      return res.status(400).json({ message: "post, upvoter are required !!" });
    }
    const newUpvote = new Upvote({
      post,
      upvoter,
    });
    const relatedPost = await Post.findById(post);

    if (!relatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    const upvoteExists = await Upvote.findOne({
      post: post,
      upvoter: upvoter,
    });
    if (upvoteExists) {
      relatedPost.upvotes = relatedPost.upvotes.filter(
        (upvote) => upvote.toString() !== upvoteExists._id.toString()
      );
      await relatedPost.save();
      await Upvote.findByIdAndDelete(upvoteExists._id);
      return res.status(200).json({ message: "Upvote removed" });
    } else {
      await newUpvote.save();
      relatedPost.upvotes.push(newUpvote._id);
      await relatedPost.save();
      return res.status(200).json({ message: "successfully created Upvote" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
