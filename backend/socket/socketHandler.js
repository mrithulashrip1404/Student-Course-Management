const Message = require("../models/Message");
const Notification = require("../models/Notification");

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        const userId = socket.user.id;

        // Join the user's private room
        socket.join(userId);

        console.log(`User ${userId} connected`);

        // Send a message to another user
        socket.on("sendMessage", async (data, callback) => {
            try {
                const { receiverId, message } = data;

                if (!receiverId || !message || !message.trim()) {
                    return callback?.({
                        success: false,
                        message: "Receiver and message are required"
                    });
                }

                const newMessage = await Message.create({
                    sender: userId,
                    receiver: receiverId,
                    message: message.trim()
                });

                const notification = await Notification.create({
                    user: receiverId,
                    sender: userId,
                    message: "You received a new message",
                    type: "message"
                });

                const messageData = {
                    _id: newMessage._id,
                    sender: userId,
                    receiver: receiverId,
                    message: newMessage.message,
                    createdAt: newMessage.createdAt
                };

                // Deliver instantly to the receiver
                io.to(receiverId).emit("receiveMessage", messageData);
                io.to(receiverId).emit("newNotification", notification);

                callback?.({
                    success: true,
                    message: "Message sent",
                    data: messageData
                });
            } catch (error) {
                console.error("Message error:", error.message);
                callback?.({
                    success: false,
                    message: "Unable to send message"
                });
            }
        });

        socket.on("disconnect", () => {
            console.log(`User ${userId} disconnected`);
        });
    });
};

module.exports = socketHandler;