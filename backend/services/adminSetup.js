const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createAdmin = async () => {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error("Admin credentials are missing in .env");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
        { email },
        {
            $set: {
                name: "Administrator",
                email,
                password: hashedPassword,
                role: "admin"
            }
        },
        { upsert: true, new: true, runValidators: true }
    );

    console.log("Admin account initialized");
};

module.exports = createAdmin;