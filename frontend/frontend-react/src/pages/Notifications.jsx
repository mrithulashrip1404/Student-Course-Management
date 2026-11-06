import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import api from "../services/api";
import { connectSocket } from "../services/socketService";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchNotifications = async () => {
        try {
            const response = await api.get("/notifications");
            setNotifications(response.data.data || []);
            setError("");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load notifications."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();

        const socket = connectSocket();

        if (!socket) return;

        const handleNotification = (notification) => {
            setNotifications((previous) => {
                if (previous.some((item) => item._id === notification._id)) {
                    return previous;
                }

                return [notification, ...previous];
            });
        };

        socket.on("newNotification", handleNotification);

        return () => {
            socket.off("newNotification", handleNotification);
        };
    }, []);

    const markAsRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);

            setNotifications((previous) =>
                previous.map((item) =>
                    item._id === id ? { ...item, read: true } : item
                )
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to update notification."
            );
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.put("/notifications/read-all");

            setNotifications((previous) =>
                previous.map((item) => ({ ...item, read: true }))
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to update notifications."
            );
        }
    };

    const unreadCount = notifications.filter(
        (item) => !item.read
    ).length;

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-main">
                <TopBar />

                <section className="notifications-page">
                    <div className="page-heading">
                        <p>STAY UPDATED</p>
                        <h2>Notifications</h2>
                        <span>
                            View your latest updates and messages.
                        </span>
                    </div>

                    <div className="notifications-header">
                        <div>
                            <h3>Your Updates</h3>
                            <p>
                                {unreadCount} unread notification(s)
                            </p>
                        </div>

                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={markAllAsRead}
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {error && (
                        <p className="notification-error">{error}</p>
                    )}

                    {loading ? (
                        <p>Loading notifications...</p>
                    ) : notifications.length === 0 ? (
                        <div className="notifications-empty">
                            <span>🔔</span>
                            <h3>You're all caught up!</h3>
                            <p>You don't have any notifications yet.</p>
                        </div>
                    ) : (
                        <div className="notifications-list">
                            {notifications.map((item) => (
                                <article
                                    className={`notification-item ${
                                        item.read ? "read" : "unread"
                                    }`}
                                    key={item._id}
                                >
                                    <div className="notification-icon">
                                        {item.type === "message" ? "💬" : "🔔"}
                                    </div>

                                    <div className="notification-content">
                                        <p>{item.message}</p>

                                        <small>
                                            {item.sender?.name
                                                ? `From ${item.sender.name} · `
                                                : ""}
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleString()}
                                        </small>
                                    </div>

                                    {!item.read && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                markAsRead(item._id)
                                            }
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Notifications;