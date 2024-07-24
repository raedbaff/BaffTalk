const mongoose = require('mongoose');
const downVoteSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    downvoter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
const Downvote = mongoose.model('Downvote', downVoteSchema);
module.exports = Downvote;