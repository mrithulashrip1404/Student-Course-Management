const Notification = require("../models/Notification");

// Get notifications for the logged-in user
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user.id
        })
            .populate("sender", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch notifications."
        });
    }
};

// Mark one notification as read
const markNotificationRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification marked as read.",
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to update notification."
        });
    }
};

// Mark all notifications as read
const markAllNotificationsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            {
                user: req.user.id,
                read: false
            },
            { read: true }
        );

        res.status(200).json({
            success: true,
            message: "All notifications marked as read."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to update notifications."
        });
    }
};

module.exports = {
    getNotifications,
    markNotificationRead,
    markAllNotificationsRead
};