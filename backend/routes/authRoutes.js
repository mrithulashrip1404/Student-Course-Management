
const express = require("express");
const router = express.Router();

const {
    registerStudent,
    loginStudent,
    registerAdmin
} = require("../controllers/authController");

const {
    validateRegistration,
    validateAdminRegistration,
    validateLogin
} = require("../middleware/authValidation");

// Student authentication
router.post("/register", validateRegistration, registerStudent);
router.post("/login", validateLogin, loginStudent);

// Admin registration using private registration code
router.post(
    "/admin/register",
    validateAdminRegistration,
    registerAdmin
);

module.exports = router;
