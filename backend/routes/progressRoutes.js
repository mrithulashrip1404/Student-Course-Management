const express = require("express");
const router = express.Router();

const {
    getProgress,
    completeLesson
} = require("../controllers/progressController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.use(authMiddleware, authorizeRoles("student"));

router.get("/:courseId", getProgress);
router.post("/:courseId/lessons/:lessonId/complete", completeLesson);

module.exports = router;