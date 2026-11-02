import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket;

export const connectSocket = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    if (!socket) {
        socket = io(SOCKET_URL, {
            auth: { token },
            autoConnect: false
        });
    }

    if (!socket.connected) {
        socket.connect();
    }

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};