
const validateRegistration = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email, and password are required"
        });
    }

    if (typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Name must contain at least 2 characters"
        });
    }

    if (typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email"
        });
    }

    if (typeof password !== "string" || password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (
        typeof email !== "string" || !email.trim() ||
        typeof password !== "string" || !password
    ) {
        return res.status(400).json({
            success: false,
            message: "Valid email and password are required"
        });
    }

    next();
};

module.exports = {
    validateRegistration,
    validateLogin
};
