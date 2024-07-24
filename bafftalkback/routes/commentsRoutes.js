const express = require("express");
const {
  createComment,
  getComments,
  deleteComment,
  EditComment,
  getCommentsByPost,
} = require("../controllers/CommentController");
const router = express.Router();

router.post("/comments", createComment);
router.delete("/comments/:id", deleteComment);
router.put("/comments/:id", EditComment);
router.get("/comments", getComments);
router.get("/comments/post/:postId", getCommentsByPost);

module.exports = router;
