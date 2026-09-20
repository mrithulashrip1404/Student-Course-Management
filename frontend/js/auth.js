import { setUser, clearState } from "./state.js";

export function login(email) {
    const user = {
        email: email
    };

    setUser(user);
}

export function register(name, email) {
    const user = {
        name: name,
        email: email
    };

    setUser(user);
}

export function logout() {
    clearState();
}

export function isLoggedIn() {
    return localStorage.getItem("user") !== null;
}