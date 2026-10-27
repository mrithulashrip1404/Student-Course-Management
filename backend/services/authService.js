
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const students = require("../data/students");

const registerStudent = async (studentData) => {
    const { name, email, password } = studentData;
    const normalizedEmail = email.trim().toLowerCase();

    const existingStudent = students.find(
        (student) => student.email === normalizedEmail
    );

    if (existingStudent) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = {
        id: uuidv4(),
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role : "student"
    };

    students.push(newStudent);

    const { password: removedPassword, ...studentWithoutPassword } = newStudent;
    return studentWithoutPassword;
};

const loginStudent = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    const student = students.find(
        (student) => student.email === normalizedEmail
    );

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
            id: student.id,
            email: student.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h"
        }
    );

    const { password: removedPassword, ...studentWithoutPassword } = student;

    return {
        student: studentWithoutPassword,
        token
    };
};

module.exports = {
    registerStudent,
    loginStudent
};
