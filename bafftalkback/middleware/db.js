const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();
try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("successfully connected to mongoDB");
} catch (error) {
  console.log("something went wrong while conneting to mongodb");
}
let bucket;
mongoose.connection.once("open", () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
  console.log("created bucket");
});
const getBucket = () => {
  if (!bucket) {
    throw new Error("Bucket has not been initialized");
  }
  return bucket
};
const storage = multer.memoryStorage();

const upload = multer({ storage });
module.exports = { upload, getBucket };
