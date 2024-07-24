const express = require('express');
const { createComment, getComments, deleteComment, EditComment } = require('../controllers/CommentController');
const router = express.Router();

router.post("/comments", createComment);
router.get("/comments", getComments);
router.delete("/comments/:id", deleteComment);
router.put("/comments/:id", EditComment);

module.exports = router;