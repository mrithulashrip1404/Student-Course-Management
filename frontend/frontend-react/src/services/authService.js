
import api from "./api";

// Register student
export const registerStudent = async (studentData) => {
    const response = await api.post("/v1/auth/register", studentData);
    return response.data;
};

// Login student
export const loginStudent = async (loginData) => {
    const response = await api.post("/v1/auth/login", loginData);
    return response.data;
};

// Register administrator
export const registerAdmin = async (adminData) => {
    const response = await api.post("/v1/auth/admin/register", adminData);
    return response.data;
};
