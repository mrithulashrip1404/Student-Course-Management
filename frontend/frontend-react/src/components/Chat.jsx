import { useEffect, useState } from "react";
import { connectSocket } from "../services/socketService";

function Chat() {
    const [receiverId, setReceiverId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState("Connecting...");

    useEffect(() => {
        const socket = connectSocket();

        if (!socket) {
            setStatus("Please log in to use chat");
            return;
        }

        const handleConnect = () => setStatus("Online");
        const handleDisconnect = () => setStatus("Offline");

        const handleReceiveMessage = (newMessage) => {
            setMessages((previous) => [...previous, newMessage]);
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("receiveMessage", handleReceiveMessage);

        if (socket.connected) {
            setStatus("Online");
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, []);

    const sendMessage = () => {
        if (!receiverId.trim() || !message.trim()) {
            alert("Enter the receiver ID and message");
            return;
        }

        const socket = connectSocket();

        if (!socket) {
            setStatus("Please log in first");
            return;
        }

        socket.emit("sendMessage", {
            receiverId: receiverId.trim(),
            message: message.trim()
        }, (response) => {
            if (response.success) {
                setMessages((previous) => [...previous, response.data]);
                setMessage("");
            } else {
                alert(response.message);
            }
        });
    };

    return (
        <div className="chat-container">
            <h2>Real-Time Chat</h2>
            <p>Connection Status: {status}</p>

            <input
                type="text"
                placeholder="Enter receiver user ID"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
            />

            <div className="chat-messages">
                {messages.map((item, index) => (
                    <p key={item._id || index}>
                        <strong>{item.sender === JSON.parse(localStorage.getItem("student") || "{}")._id ? "You" : "User"}:</strong>{" "}
                        {item.message}
                    </p>
                ))}
            </div>

            <input
                type="text"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
}

export default Chat;