const mongoose = require("mongoose");
const animalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "animal name required"],
    },
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "uploads.files",
      required:[true,"photo required"]
    },
  },
  { timestamps: true },
);

const Animal = mongoose.model("Animal", animalSchema);
module.exports = Animal;
