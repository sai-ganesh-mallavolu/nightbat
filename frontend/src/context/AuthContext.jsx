import { createContext, useContext, useEffect, useState } from "react";

import {
    login as loginUser,
    register as registerUser,
    getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // ===============================
    // Auto Login
    // ===============================

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        const token = localStorage.getItem("access");

        if (!token) {

            setLoading(false);

            return;

        }

        try {

            const userData = await getCurrentUser();

            setUser(userData);

        }

        catch (error) {

            console.error(error);

            // Only clear invalid tokens
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            setUser(null);

        }

        finally {

            setLoading(false);

        }

    };

    // ===============================
    // Login
    // ===============================

    const login = async (username, password) => {

        const data = await loginUser(username, password);

        localStorage.setItem("access", data.access);

        localStorage.setItem("refresh", data.refresh);

        const userData = await getCurrentUser();

        setUser(userData);

    };

    // ===============================
    // Register
    // ===============================

    const register = async (formData) => {

        await registerUser(formData);

    };

    // ===============================
    // Logout
    // ===============================

    const logout = () => {

        localStorage.removeItem("access");

        localStorage.removeItem("refresh");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export const useAuth = () => useContext(AuthContext);