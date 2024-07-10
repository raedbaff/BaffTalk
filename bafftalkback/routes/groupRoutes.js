const express = require("express");
const { upload } = require("../middleware/db");
const { createGroup,getPhoto, fetchAllGroups, fetchPopularGroups, fetchGroupById, joinGroup, getCoverPhoto } = require("../controllers/GroupController");
const router = express.Router();

router.post("/group", upload.fields([{ name: 'groupImage' }, { name: 'groupCoverImage' }]), createGroup);
router.get("/group/photo/:id",getPhoto)
router.get("/group/coverphoto/:id",getCoverPhoto);
router.get("/group",fetchAllGroups)
router.get("/group/top3",fetchPopularGroups)
router.get("/group/:id",fetchGroupById)
router.put("/group/:userId/:groupId",joinGroup)

module.exports = router;
