import api from "./api";

// ===============================
// Register
// ===============================

export const register = async (data) => {

    const response = await api.post(

        "/register/",

        data

    );

    return response.data;

};

// ===============================
// Login
// ===============================

export const login = async (username, password) => {

    const response = await api.post(

        "/login/",

        {

            username,

            password,

        }

    );

    return response.data;

};

// ===============================
// Current User
// ===============================

export const getCurrentUser = async () => {

    const response = await api.get(

        "/me/"

    );

    return response.data;

};

// ===============================
// Refresh Token
// ===============================

export const refreshToken = async (refresh) => {

    const response = await api.post(

        "/token/refresh/",

        {

            refresh,

        }

    );

    return response.data;

};