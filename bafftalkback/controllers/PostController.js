const { getBucket } = require("../middleware/db");
const Post = require("../models/Post");
const { Readable } = require("stream");
exports.createPost = async (req, res) => {
  try {
    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json({ error: "Bucket is not initialized" });
    }
    const { title, description, group, maker } = req.body;
    const postImage = req.file;

    if (!title || !description || !group || !maker || !postImage) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const uploadFileToBucket = (file) => {
      return new Promise((resolve, reject) => {
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);
        const uploadStream = bucket.openUploadStream(file.originalname, {
          contentType: file.mimetype,
        });
        uploadStream.on("error", (error) => {
          reject(error);
        });
        uploadStream.on("finish", () => {
          resolve(uploadStream.id);
        });
        readableStream.pipe(uploadStream);
      });
    };

    const postImageId = await uploadFileToBucket(postImage);
    const newPost = new Post({
      title,
      description,
      postImage: postImageId,
      maker,
      group,
    });
    await newPost.save();
    res.status(200).json({ message: "successfully created Post" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("maker").populate("group");
    if (!posts) {
      return res.status(404).json({ error: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getPostPhoto = async (req, res) => {
  try {
    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json({ error: "Bucket not initialized" });
    }
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Such a post not found" });
    }
    const downloadStream = bucket.openDownloadStream(post.postImage);
    downloadStream.pipe(res);
    downloadStream.on("error", (error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch photo" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getPostsByGroup = async (req, res) => {
  try {
    const { groupId} = req.params;
    if (!groupId) {
      return res.status(400).json({ error: "Group ID required" });
    }

    const posts = await Post.find({ group: groupId}).populate("maker")
    if (!posts) {
      return res.status(404).json({ error: "No posts found" });
    }
    res.status(200).json(posts);


  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};
