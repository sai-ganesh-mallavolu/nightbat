import axios from "axios";

const api = axios.create({

    baseURL: "http://127.0.0.1:8000/api",

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

        // Don't try to refresh for login/register/token endpoints
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

            // No refresh token → just clear storage
            if (!refresh) {

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                return Promise.reject(error);

            }

            try {

                const response = await axios.post(

                    "http://127.0.0.1:8000/api/token/refresh/",

                    {

                        refresh,

                    }

                );

                localStorage.setItem(

                    "access",

                    response.data.access

                );

                originalRequest.headers.Authorization =
                    `Bearer ${response.data.access}`;

                return api(originalRequest);

            }

            catch (refreshError) {

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                return Promise.reject(refreshError);

            }

        }

        return Promise.reject(error);

    }

);

export default api;