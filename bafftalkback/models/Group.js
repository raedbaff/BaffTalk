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
      type: String,
      default: "",
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
        default: [],
      },
    ],
  },
  { timestamps: true },
);

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
