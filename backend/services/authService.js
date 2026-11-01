const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

module.exports = {
    registerStudent,
    loginStudent
};