const express = require('express');
const { createDownvote } = require('../controllers/DownvoteController');
const router = express.Router();

router.post('/downvotes', createDownvote);

module.exports = router;