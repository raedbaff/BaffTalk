const { getBucket } = require("../middleware/db");
const Animal = require("../models/animal");

exports.getAll = async (req, res) => {
  try {
    const animals = await Animal.find({});
    if (!animals) {
      res.status(404).json({ message: "no animals found" });
    }
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }
    res.status(200).json({ animal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.getPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    if (!animal) {
      return res.status(404).json({ error: "Animal not found" });
    }

    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json({ error: "Bucket is not initialized" });
    }

    const downloadStream = bucket.openDownloadStream(animal.photo);
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
