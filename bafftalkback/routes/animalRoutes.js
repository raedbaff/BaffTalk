const express = require("express");
const router = express.Router();
const Animal = require("../models/animal");
const { Readable } = require("stream");
const { upload, getBucket } = require("../middleware/db");
const { getAll, getById, getPhoto } = require("../controllers/AnimalController");

router.post("/animal", upload.single("file"), async (req, res) => {
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

        const { name } = req.body;
        const animalData = { name, photo: file };
        const animal = new Animal(animalData);

        await animal.save();
        res.status(201).json({ animal });
      } catch (error) {
        console.error("Error saving animal:", error);
        res.status(500).json({ error: error.message });
      }
    });

    readableStream.pipe(uploadStream);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/animal", getAll);
router.get("/animal/:id",getById)
router.get("/animal/photo/:id",getPhoto)

module.exports = router;
