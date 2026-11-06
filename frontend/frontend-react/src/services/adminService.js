import api from "./api";

// Fetch all administrators
export const getAdmins = async () => {
    const response = await api.get("/admins");
    return response.data;
};

// Create a new administrator
export const createAdmin = async (adminData) => {
    const response = await api.post("/admins", adminData);
    return response.data;
};