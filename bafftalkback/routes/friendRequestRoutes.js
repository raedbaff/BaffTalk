const express = require('express');
const { CreateFriendRequest, GetFriendRequests, AcceptFriendRequest, RejectFriendRequest, getFriendRequestBetweenUsers } = require('../controllers/FriendRequestController');
const router = express.Router();

router.post("/sendFriendRequest/:senderId/:receiverId", CreateFriendRequest);
router.get("/getFriendRequestBetweenUsers/:senderId/:receiverId", getFriendRequestBetweenUsers);
router.get("/getFriendRequests/:userId", GetFriendRequests);
router.put("/acceptFriendRequest/:requestId", AcceptFriendRequest);
router.put("/rejectFriendRequest/:requestId", RejectFriendRequest);

module.exports = router;