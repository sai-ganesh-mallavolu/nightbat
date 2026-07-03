import axios from "axios";

const api = axios.create({
    baseURL: "https://nightbat.onrender.com/api",
    timeout: 60000,
});

// =======================================
// Attach Access Token
// =======================================

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// =======================================
// Auto Refresh Token
// =======================================

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // Don't refresh for auth endpoints
        if (
            originalRequest?.url?.includes("/login/") ||
            originalRequest?.url?.includes("/register/") ||
            originalRequest?.url?.includes("/token/refresh/")
        ) {
            return Promise.reject(error);
        }

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refresh = localStorage.getItem("refresh");

            if (!refresh) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                return Promise.reject(error);
            }

            try {
                const response = await axios.post(
                    "https://nightbat.onrender.com/api/token/refresh/",
                    {
                        refresh,
                    }
                );

                const newAccessToken = response.data.access;

                localStorage.setItem("access", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;