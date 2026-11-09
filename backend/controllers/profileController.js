const User = require("../models/User");

const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "A valid name is required"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name: name.trim() },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// Get user settings
const getSettings = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("preferences");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user.preferences
        });
    } catch (error) {
        next(error);
    }
};

// Update user settings
const updateSettings = async (req, res, next) => {
    try {
        const { compactView, showDashboardNotifications } = req.body;

        if (
            (compactView !== undefined && typeof compactView !== "boolean") ||
            (showDashboardNotifications !== undefined &&
                typeof showDashboardNotifications !== "boolean")
        ) {
            return res.status(400).json({
                success: false,
                message: "Settings values must be true or false"
            });
        }

        if (
            compactView === undefined &&
            showDashboardNotifications === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "At least one setting must be provided"
            });
        }

        const updates = {};

        if (compactView !== undefined) {
            updates["preferences.compactView"] = compactView;
        }

        if (showDashboardNotifications !== undefined) {
            updates["preferences.showDashboardNotifications"] =
                showDashboardNotifications;
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("preferences");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            data: user.preferences
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getSettings,
    updateSettings
};