import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Upload from "../pages/Upload";
import History from "../pages/History";
import DocumentDetails from "../pages/DocumentDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import PrivateRoute from "../components/auth/PrivateRoute";

function AppRoutes() {

    return (

        <Routes>

            {/* ==========================
                Public Routes
            ========================== */}

            <Route element={<MainLayout />}>

                <Route

                    path="/"

                    element={<Home />}

                />

            </Route>

            <Route

                path="/login"

                element={<Login />}

            />

            <Route

                path="/register"

                element={<Register />}

            />

            {/* ==========================
                Protected Routes
            ========================== */}

            <Route

                element={

                    <PrivateRoute>

                        <MainLayout />

                    </PrivateRoute>

                }

            >

                <Route

                    path="/upload"

                    element={<Upload />}

                />

                <Route

                    path="/history"

                    element={<History />}

                />

                <Route

                    path="/history/:id"

                    element={<DocumentDetails />}

                />

            </Route>

            {/* ==========================
                404
            ========================== */}

            <Route

                path="*"

                element={<NotFound />}

            />

        </Routes>

    );

}

export default AppRoutes;