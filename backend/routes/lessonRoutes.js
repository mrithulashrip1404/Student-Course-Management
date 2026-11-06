const express = require("express");
const router = express.Router();

const {
    addLesson,
    updateLesson,
    deleteLesson
} = require("../controllers/lessonController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.use(authMiddleware, authorizeRoles("admin"));

router.post("/:courseId", addLesson);
router.put("/:courseId/:lessonId", updateLesson);
router.delete("/:courseId/:lessonId", deleteLesson);

module.exports = router;