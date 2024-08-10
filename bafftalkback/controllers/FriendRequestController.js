const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");

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
    const friendRequests = await FriendRequest.find({ receiver: userId }).populate("sender");
    if (friendRequests.length === 0) {
      return res.status(404).json({ message: "No friend requests found" });
    }
    res.status(200).json(friendRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.SentFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }
    const friendRequests = await FriendRequest.find({ sender: userId }).populate("receiver");
    if (friendRequests.length === 0) {
      return res.status(404).json({ message: "No friend requests found" });
    }
    res.status(200).json(friendRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.DeleteFriendRequest = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.AcceptFriendRequest = async (req, res) => {
  try {
    const { requestId} = req.params;
    if (!requestId) {
      return res.status(400).json({ message: "Request id is required" });
    }
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    friendRequest.state = "accepted";
    await User.findByIdAndUpdate(friendRequest.sender, {
      $push: { friends: friendRequest.receiver },
    });
    await User.findByIdAndUpdate(friendRequest.receiver, {
      $push: { friends: friendRequest.sender },
    });
    await friendRequest.save();
    res.status(200).json({message:"Friend request accepted"});
    

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.RejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    if (!requestId) {
      return res.status(400).json({ message: "Request id is required" });
    }
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    friendRequest.state = "rejected";
    await friendRequest.save();
    res.status(200).json({message:"Friend request rejected"});
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
