 const { Readable } = require("stream");
 const { getBucket } = require("../middleware/db");

 
 const uploadFileToBucket = (file) => {
    return new Promise((resolve, reject) => {
      const bucket = getBucket();
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

  module.exports = uploadFileToBucket;