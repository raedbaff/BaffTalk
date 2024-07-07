const mongoose = require("mongoose");
const { Readable } = require("stream");
const { getBucket } = require("../middleware/db");
const Group = require("../models/Group");

exports.createGroup = async (req, res) => {
  try {
    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json({ error: "Bucket is not initialized" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "File is not provided" });
    }
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    uploadStream.on("error", (error) => {
      console.error("Error during file upload:", error);
      return res.status(500).json({ error: "Error during file upload" });
    });
    uploadStream.on("finish", async () => {
      try {
        const file = uploadStream.id;

        if (!file) {
          return res.status(500).json({ error: "File upload failed" });
        }
        const { name, description, topic, maker } = req.body;
        const newGroup = new Group({
          name,
          description,
          groupImage: file,
          topic,
          maker,
        });
        newGroup.save();
        res.status(201).json({ newGroup });
      } catch (error) {
        console.error("Error saving animal:", error);
        res.status(500).json({ error: error.message });
      }
    });
    readableStream.pipe(uploadStream);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.getPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json({ error: "Bucket is not initialized" });
    }

    const downloadStream = bucket.openDownloadStream(group.groupImage);
    downloadStream.pipe(res);
    downloadStream.on("error", (error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch photo" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
