const express = require("express");
const router = express.Router();
const { Readable } = require("stream");
const { upload, getBucket } = require("../middleware/db");

router.post("/upload", upload.single("file"), (req, res) => {
  const bucket = getBucket();

  const readableStream = new Readable();
  readableStream.push(req.file.buffer);
  readableStream.push(null);

  const uploadStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });

  readableStream
    .pipe(uploadStream)
    .on("error", (error) => res.status(500).json({ error }))
    .on("finish", () => res.status(201).json({ file: req.file }));
});

module.exports = router;
