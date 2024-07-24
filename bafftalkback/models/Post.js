const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title required"],
    },
    description: {
      type: String,
      required: [true, "Post description required"],
    },
    postImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "uploads.files",
      required: false,
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    upvotes : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Upvote"
      }
    ],
    downvotes : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Downvote"
      }
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
