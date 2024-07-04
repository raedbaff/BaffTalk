const User = require("../models/User");

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
