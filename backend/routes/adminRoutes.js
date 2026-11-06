const express = require("express");
const router = express.Router();

const {
    createAdmin,
    getAdmins
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Only authenticated administrators can access these routes
router.use(authMiddleware, authorizeRoles("admin"));

router.get("/", getAdmins);
router.post("/", createAdmin);

module.exports = router;