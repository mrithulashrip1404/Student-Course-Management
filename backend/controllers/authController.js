
const authService = require("../services/authService");

// Register student
const registerStudent = async (req, res) => {
    try {
        const student = await authService.registerStudent(req.body);

        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            data: student
        });
    } catch (error) {
        const statusCode =
            error.message === "Email already registered" ? 409 : 500;

        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

// Login student
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginStudent(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result.student,
            token: result.token
        });
    } catch (error) {
        const statusCode =
            error.message === "Invalid email or password" ? 401 : 500;

        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

// Register administrator
const registerAdmin = async (req, res) => {
    try {
        const admin = await authService.registerAdmin(req.body);

        res.status(201).json({
            success: true,
            message: "Administrator registered successfully",
            data: admin
        });
    } catch (error) {
        let statusCode = 500;

        if (error.message === "Email already registered") {
            statusCode = 409;
        } else if (error.message === "Invalid admin registration code") {
            statusCode = 403;
        } else if (
            error.message === "Admin registration is currently unavailable"
        ) {
            statusCode = 503;
        }

        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    registerStudent,
    loginStudent,
    registerAdmin
};
