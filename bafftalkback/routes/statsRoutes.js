const express = require("express");
const { getStats, Top3Users } = require("../controllers/StatsController");
const router = express.Router();

router.get("/statistics", getStats);
router.get("/top3users", Top3Users);

module.exports = router;
