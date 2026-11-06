const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Create a new administrator
const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        if (name.trim().length < 2 || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Name must contain at least 2 characters and password at least 6 characters"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: "admin"
        });

        res.status(201).json({
            success: true,
            message: "Administrator created successfully",
            data: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role
            }
        });
    } catch (error) {
        console.error("Admin creation error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to create administrator"
        });
    }
};

// Fetch all administrators without passwords
const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" })
            .select("_id name email role createdAt")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: admins.length,
            data: admins
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch administrators"
        });
    }
};

module.exports = {
    createAdmin,
    getAdmins
};