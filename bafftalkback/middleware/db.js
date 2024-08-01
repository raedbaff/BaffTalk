const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();

const connectWithRetry = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to MongoDB");
    createBucket();
  } catch (error) {
    console.error("Something went wrong while connecting to MongoDB:", error);
    setTimeout(connectWithRetry, 2000); 
  }
};

let bucket;
const createBucket = () => {
  if (!bucket) {
    try {
      bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      console.log("Created bucket");
    } catch (error) {
      console.error("Failed to create bucket, retrying...");
      setTimeout(createBucket, 2000); // Retry after 2 seconds
    }
  }
};

const getBucket = () => {
  if (!bucket) {
    throw new Error("Bucket has not been initialized");
  }
  return bucket;
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = { upload, getBucket };

// Start the connection process
connectWithRetry();
