const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createAdmin = async () => {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error("Admin credentials are missing in .env");
    }

    const existingAdmin = await User.findOne({ email });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: "Administrator",
            email,
            password: hashedPassword,
            role: "admin"
        });
    }

    console.log("Admin account initialized");
};

module.exports = createAdmin;