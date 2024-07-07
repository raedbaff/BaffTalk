const express = require("express");
const { upload } = require("../middleware/db");
const { createGroup,getPhoto } = require("../controllers/GroupController");
const router = express.Router();

router.post("/group", upload.single("file"), createGroup);
router.get("/group/photo/:id",getPhoto)

module.exports = router;
