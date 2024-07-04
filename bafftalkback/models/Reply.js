const mongoose = require("mongoose");
const ReplySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "reply content required"],
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: [true, "reply's original comment is required"],
    },
  },
  { timestamps: true },
);

const Reply = mongoose.model("Reply", ReplySchema);
module.exports = Reply;
