const Comment = require("../models/Comment");
const Post = require("../models/Post");
exports.createComment = async (req, res) => {
  try {
    const { content, post, maker } = req.body;
    if (!content || !post || !maker) {
      return res
        .status(400)
        .json({ message: "content, post, maker are required !!" });
    }
    const newComment = new Comment({
      content,
      post,
      maker,
    });
    await newComment.save();
    const relatedPost = await Post.findById(post);
    relatedPost.comments.push(newComment._id);
    await relatedPost.save();
    res.status(200).json({ message: "successfully created Comment",comment:newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    if (comments.length === 0) {
      return res.status(404).json({ message: "No comments found" });
    }
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await Comment.findByIdAndDelete(id);
    const relatedPost = await Post.findById(comment.post);
    relatedPost.comments = relatedPost.comments.filter(
      (comment) => comment.toString() !== id
    );
    await relatedPost.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.EditComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "content is required" });
    }
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comment.content = content;
    await comment.save();
    res.status(200).json({ message: "Comment edited successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const comments = await Comment.find({ post: postId }).populate("maker");

    if (comments.length === 0) {
      return res.status(404).json({ message: "No comments found" });
    }
    res.status(200).json({ comments });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
