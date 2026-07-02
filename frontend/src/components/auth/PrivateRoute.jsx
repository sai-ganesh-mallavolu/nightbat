import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function PrivateRoute({ children }) {

    const {

        loading,

        isAuthenticated,

    } = useAuth();

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-black">

                <div className="text-center">

                    <div className="text-6xl animate-pulse">

                        🦇

                    </div>

                    <h2 className="mt-5 text-3xl font-bold text-cyan-400">

                        Loading...

                    </h2>

                </div>

            </div>

        );

    }

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    return children;

}

export default PrivateRoute;