const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    getSettings,
    updateSettings
} = require("../controllers/profileController");

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);

router.get("/settings", authMiddleware, getSettings);
router.put("/settings", authMiddleware, updateSettings);

module.exports = router;