const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    password: {
      type: String,
      required: false,
      default: null,
    },
    avatar: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
    },
    links: [
      {
        type: String,
        default: [],
      },
    ],
   

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    
    
  },
  { timestamps: true }
);

UserSchema.methods.verifyPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
