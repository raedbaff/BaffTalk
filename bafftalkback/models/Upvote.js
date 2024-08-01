const mongoose = require('mongoose');
const UpvoteSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    upvoter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
const Upvote = mongoose.model('Upvote', UpvoteSchema);
module.exports = Upvote;