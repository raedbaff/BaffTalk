const express = require("express");
const { upload } = require("../middleware/db");
const { createGroup,getPhoto, fetchAllGroups, fetchPopularGroups, fetchGroupById, joinGroup, getCoverPhoto, fetchGroupsByTopic,fetchJoinedGroups, deleteGroup } = require("../controllers/GroupController");
const router = express.Router();

router.post("/group", upload.fields([{ name: 'groupImage' }, { name: 'groupCoverImage' }]), createGroup);
router.get("/group/photo/:id",getPhoto)
router.delete("/group/:id",deleteGroup)
router.get("/group/coverphoto/:id",getCoverPhoto);
router.get("/group",fetchAllGroups)
router.get("/group/topic/:topic",fetchGroupsByTopic)
router.get("/group/popular/top3",fetchPopularGroups)
router.get("/group/:id",fetchGroupById)
router.put("/group/:userId/:groupId",joinGroup)
router.get("/group/joined/:userId",fetchJoinedGroups)

module.exports = router;
