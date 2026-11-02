import { useEffect, useState } from "react";
import { connectSocket } from "../services/socketService";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = connectSocket();

        if (!socket) return;

        const handleNotification = (notification) => {
            setNotifications((previous) => [notification, ...previous]);
        };

        socket.on("newNotification", handleNotification);

        return () => {
            socket.off("newNotification", handleNotification);
        };
    }, []);

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>

            {notifications.length === 0 ? (
                <p>No new notifications.</p>
            ) : (
                notifications.map((item, index) => (
                    <div key={item._id || index}>
                        <p>{item.message}</p>
                        <small>
                            {new Date(item.createdAt).toLocaleString()}
                        </small>
                    </div>
                ))
            )}
        </div>
    );
}

export default Notifications;