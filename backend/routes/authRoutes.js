
const express = require("express");
const router = express.Router();

const {
    registerStudent,
    loginStudent
} = require("../controllers/authController");

const {
    validateRegistration,
    validateLogin
} = require("../middleware/authValidation");

router.post("/register", validateRegistration, registerStudent);
router.post("/login", validateLogin, loginStudent);

module.exports = router;
