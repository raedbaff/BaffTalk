const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "comment content required"],
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "comment's post is required"],
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
