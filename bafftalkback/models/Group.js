const mongoose = require("mongoose");
const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Group name required"],
    },
    description: {
      type: String,
      required: [true, "Group description required"],
    },
    groupImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "uploads.files",
      required:[true,"Group image is required"]
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:false,
        default: [],
      },
    ],
  },
  { timestamps: true },
);

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
