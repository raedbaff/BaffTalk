const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/db");
const { createPost, getPosts, getPostPhoto } = require("../controllers/PostController");

router.post("/post", upload.single("postImage"),createPost);
router.get("/posts", getPosts);
router.get("/post/photo/:id", getPostPhoto);

module.exports = router;
