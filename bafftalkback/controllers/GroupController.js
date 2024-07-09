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

    const { name, description, topic, maker,rules } = req.body;
    console.log("incoming rules");
    console.log(rules);
    console.log(JSON.parse(rules));
    if (!name || !description || !topic || !maker) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    uploadStream.on("error", (error) => {
      console.error("Error during file upload:", error);
      res.status(500).json({ error: "Error during file upload" });
    });

    uploadStream.on("finish", async () => {
      try {
        const file = uploadStream.id;
        if (!file) {
          return res.status(500).json({ error: "File upload failed" });
        }

        const newGroup = new Group({
          name,
          description,
          groupImage: file,
          topic,
          maker,
          rules:JSON.parse(rules)
        });
        newGroup.members.push(maker)

        await newGroup.save();
        res.status(201).json({ newGroup });
      } catch (error) {
        console.error("Error saving group:", error);
        res.status(500).json({ error: "Error saving group" });
      }
    });

    readableStream.pipe(uploadStream);
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Error creating group" });
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
exports.fetchAllGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    if (!groups) {
      res.status(404).json({ error: "No groups found" });
    }
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.fetchPopularGroups = async (req, res) => {
  try {
    const topGroups = await Group.aggregate([
      { $addFields: { membersCount: { $size: "$members" } } },
      { $sort: { membersCount: -1 } },
      { $limit: 3 },
    ]);
    if (!topGroups) {
      res.status(404).json("no groups found");
    }
    res.status(200).json(topGroups);
  } catch (error) {
    res.status(500).json({ error: "Error fetching groups" });
  }
};
exports.fetchGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    if (!group) {
      res.status(404).json("no such group found");
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.joinGroup = async (req, res) => {
  try {
    const { userId, groupId } = req.params;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    const userAlreadyMember = group.members.includes(userId);

    if (userAlreadyMember) {
      await group.updateOne({ $pull: { members: userId } });
      return res.status(200).json({ success: "User left the group" });
    }

    await group.updateOne({ $push: { members: userId } });
    return res.status(200).json({ success: "User added to group successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

