import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { connectSocket } from "../services/socketService";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const fetchNotifications = async () => {
            try {
                const response = await api.get("/notifications");

                if (!cancelled) {
                    setNotifications(response.data.data || []);
                }
            } catch (error) {
                console.error("Unable to load notifications:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchNotifications();

        const socket = connectSocket();

        if (!socket) return () => {
            cancelled = true;
        };

        const handleNotification = (notification) => {
            setNotifications((previous) => {
                if (previous.some((item) => item._id === notification._id)) {
                    return previous;
                }

                return [notification, ...previous].slice(0, 5);
            });
        };

        socket.on("newNotification", handleNotification);

        return () => {
            cancelled = true;
            socket.off("newNotification", handleNotification);
        };
    }, []);

    return (
        <section className="notifications-container">
            <div className="section-heading">
                <div>
                    <p className="section-label">LATEST UPDATES</p>
                    <h2>Notifications</h2>
                </div>

                <Link to="/notifications">View all</Link>
            </div>

            {loading ? (
                <p>Loading notifications...</p>
            ) : notifications.length === 0 ? (
                <p>No notifications yet.</p>
            ) : (
                <div className="dashboard-notification-list">
                    {notifications.slice(0, 5).map((item) => (
                        <div
                            className={`dashboard-notification-item ${
                                item.read ? "read" : "unread"
                            }`}
                            key={item._id}
                        >
                            <span>
                                {item.type === "message" ? "💬" : "🔔"}
                            </span>

                            <div>
                                <p>{item.message}</p>
                                <small>
                                    {new Date(item.createdAt).toLocaleString()}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Notifications;