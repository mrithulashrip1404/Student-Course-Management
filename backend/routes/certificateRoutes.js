const express = require("express");
const router = express.Router();

const {
    downloadCertificate
} = require("../controllers/certificateController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get(
    "/:courseId/download",
    authMiddleware,
    authorizeRoles("student"),
    downloadCertificate
);

module.exports = router;