import api from "./api";

export const registerStudent = async (studentData) => {
    const response = await api.post("/v1/auth/register", studentData);
    return response.data;
};

export const loginStudent = async (loginData) => {
    const response = await api.post("/v1/auth/login", loginData);
    return response.data;
};