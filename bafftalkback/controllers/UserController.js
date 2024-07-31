const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ googleId: id }).populate([
      { path: "posts", strictPopulate: false },
    ]);

    if (!user) {
      return res.status(404).json(`User with ${id} not found`);
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while fetching user information");
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json("No users found");
    }
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while fetching all users");
  }
};
exports.RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("Please provide all required fields");
    }
    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res.status(400).json("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
exports.RegisterAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("Please provide all required fields");
    }
    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res.status(400).json("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

