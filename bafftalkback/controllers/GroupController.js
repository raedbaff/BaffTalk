const { Readable } = require("stream");

const { getBucket } = require("../middleware/db");
const Group = require("../models/Group");
const Post = require("../models/Post");

const deleteFilesFromBucket = async (filesId) => {
  return new Promise((resolve, reject) => {
    const bucket = getBucket();
    if (!bucket) {
      return reject("Bucket is not initialized");
    }
    try {
      bucket.delete(filesId);
      resolve();
    } catch (error) {
      return reject(error);
    }
  });
};

exports.createGroup = async (req, res) => {
  try {
    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json({ error: "Bucket is not initialized" });
    }

    if (!req.files || !req.files.groupImage) {
      return res.status(400).json({ error: "groupImage is not provided" });
    }

    const { name, description, topic, maker, rules } = req.body;

    if (!name || !description || !topic || !maker) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const uploadFileToBucket = async (file) => {
      return new Promise((resolve, reject) => {
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);

        const uploadStream = bucket.openUploadStream(file.originalname, {
          contentType: file.mimetype,
        });

        uploadStream.on("error", (error) => {
          console.error("Error during file upload:", error);
          reject(error);
        });

        uploadStream.on("finish", () => {
          resolve(uploadStream.id);
        });

        readableStream.pipe(uploadStream);
      });
    };

    const groupImage = req.files.groupImage[0];
    const groupCoverImage = req.files.groupCoverImage
      ? req.files.groupCoverImage[0]
      : undefined;

    const groupImageId = await uploadFileToBucket(groupImage);
    const groupCoverImageId = groupCoverImage
      ? await uploadFileToBucket(groupCoverImage)
      : undefined;

    const newGroup = new Group({
      name,
      description,
      groupImage: groupImageId,
      topic,
      maker,
    });

    if (groupCoverImageId) {
      newGroup.groupCoverImage = groupCoverImageId;
    }
    if (rules) {
      newGroup.rules = JSON.parse(rules);
    }
    newGroup.members.push(maker);

    await newGroup.save();
    res.status(201).json({ newGroup });
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
exports.getCoverPhoto = async (req, res) => {
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
    const downloadStream = bucket.openDownloadStream(group.groupCoverImage);
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
exports.fetchGroupsByTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    const groups = await Group.find({ topic });
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
    return res
      .status(200)
      .json({ success: "User added to group successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const group = await Group.findById(id);
    console.log(group);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    if (group.groupImage) {
      await deleteFilesFromBucket(group.groupImage);
    }
    if (group.groupCoverImage) {
      await deleteFilesFromBucket(group.groupCoverImage);
    }
    await group.deleteOne();

    return res.status(200).json({ success: "Group deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.fetchJoinedGroups = async (req, res) => {
  try {
    const { userId } = req.params;
    const joinedGroups = await Group.find({ members: { $in: [userId] } });

    if (joinedGroups.length === 0) {
      return res.status(404).json({ message: "No groups found" });
    }
    res.status(200).json(joinedGroups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.fetchGroupAndPosts = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    const posts = await Post.find({ group:groupId}).populate("maker");
    if (!posts) {
      return res.status(404).json({ error: "No posts found" });
    }
    res.status(200).json({ group, posts });

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
