const FriendRequest = require("../models/FriendRequest");

exports.CreateFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    console.log(senderId, receiverId);

    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: "Sender and receiver are required" });
    }
    const newFriendRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
    });
    await newFriendRequest.save();
    res.status(201).json({ newFriendRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.GetFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }
    const friendRequests = await FriendRequest.find({ receiver: userId });
    if (friendRequests.length === 0) {
      return res.status(404).json({ message: "No friend requests found" });
    }
    res.status(200).json(friendRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.DeleteFriendRequest = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.AcceptFriendRequest = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.RejectFriendRequest = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFriendRequestBetweenUsers = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: "Sender and receiver are required" });
    }
    const friendRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    res.status(200).json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
