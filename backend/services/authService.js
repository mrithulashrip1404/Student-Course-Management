
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

// Register a new student
const registerStudent = async (studentData) => {
    const { name, email, password } = studentData;
    const normalizedEmail = email.trim().toLowerCase();

    const existingStudent = await User.findOne({
        email: normalizedEmail
    });

    if (existingStudent) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "student"
    });

    const studentWithoutPassword = newStudent.toObject();
    delete studentWithoutPassword.password;

    return {
        ...studentWithoutPassword,
        id: newStudent._id.toString()
    };
};

// Login student
const loginStudent = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    const student = await User.findOne({
        email: normalizedEmail
    });

    if (!student) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        student.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: student._id.toString(),
            email: student.email,
            role: student.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h"
        }
    );

    const studentWithoutPassword = student.toObject();
    delete studentWithoutPassword.password;

    return {
        student: {
            ...studentWithoutPassword,
            id: student._id.toString()
        },
        token
    };
};

// Register a new administrator using a private registration code
const registerAdmin = async (adminData) => {
    const { name, email, password, registrationCode } = adminData;

    const expectedCode = process.env.ADMIN_REGISTRATION_CODE;

    if (!expectedCode) {
        throw new Error("Admin registration is currently unavailable");
    }

    if (
        typeof registrationCode !== "string" ||
        Buffer.byteLength(registrationCode) !== Buffer.byteLength(expectedCode) ||
        !crypto.timingSafeEqual(
            Buffer.from(registrationCode),
            Buffer.from(expectedCode)
        )
    ) {
        throw new Error("Invalid admin registration code");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
        email: normalizedEmail
    });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "admin"
    });

    const adminWithoutPassword = newAdmin.toObject();
    delete adminWithoutPassword.password;

    return {
        ...adminWithoutPassword,
        id: newAdmin._id.toString()
    };
};

// Export authentication functions
module.exports = {
    registerStudent,
    loginStudent,
    registerAdmin
};
