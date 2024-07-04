const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: [true, "email must be unique"],
    },
    avatar: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
      unique: true,
    },
    links: [
      {
        type: String,
        default: [],
      },
    ],
  },
  { timestamps: true },
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
