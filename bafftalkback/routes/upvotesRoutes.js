const express = require('express');
const { createUpvote } = require('../controllers/UpvoteController');
const router = express.Router();

router.post("/upvotes", createUpvote)

module.exports = router;