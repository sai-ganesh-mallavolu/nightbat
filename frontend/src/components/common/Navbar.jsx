import { Link } from "react-router-dom";

import {
    APP_NAME,
    NAV_LINKS,
} from "../../constants/appConstants";

import { useAuth } from "../../context/AuthContext";

import ThemeToggle from "../ThemeToggle";

function Navbar() {

    const { user, logout } = useAuth();

    return (

        <header
            className="
                sticky top-0 z-50
                border-b border-gray-200
                bg-white/80
                text-gray-900
                backdrop-blur-md
                transition-colors duration-300

                dark:border-white/10
                dark:bg-black/80
                dark:text-white
            "
        >

            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}

                <Link
                    to="/"
                    className="
                        text-2xl
                        font-bold
                        text-cyan-500
                        transition
                        hover:text-cyan-600

                        dark:text-cyan-400
                        dark:hover:text-cyan-300
                    "
                >
                    🦇 {APP_NAME}
                </Link>


                {/* Navigation */}

                <div className="flex items-center gap-8">

                    {/* Home always visible */}

                    <Link
                        to="/"
                        className="
                            text-gray-700
                            transition
                            hover:text-cyan-500

                            dark:text-gray-200
                            dark:hover:text-cyan-400
                        "
                    >
                        Home
                    </Link>


                    {/* Upload & History only after login */}

                    {user &&
                        NAV_LINKS
                            .filter(
                                (link) => link.path !== "/"
                            )
                            .map((link) => (

                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="
                                        text-gray-700
                                        transition
                                        hover:text-cyan-500

                                        dark:text-gray-200
                                        dark:hover:text-cyan-400
                                    "
                                >
                                    {link.name}
                                </Link>

                            ))
                    }

                </div>


                {/* Right Side */}

                <div className="flex items-center gap-4">

                    {/* Theme Toggle */}

                    <ThemeToggle />


                    {user ? (

                        <>

                            {/* User Card */}

                            <div
                                className="
                                    flex items-center gap-3
                                    rounded-xl
                                    border border-gray-200
                                    bg-gray-50
                                    px-4 py-2
                                    transition-colors duration-300

                                    dark:border-white/10
                                    dark:bg-[#0a0a0a]
                                "
                            >

                                {/* User Avatar */}

                                <div
                                    className="
                                        flex h-10 w-10
                                        items-center justify-center
                                        rounded-full
                                        bg-cyan-500
                                        text-lg
                                        font-bold
                                        text-black
                                    "
                                >

                                    {user.username
                                        .charAt(0)
                                        .toUpperCase()}

                                </div>


                                {/* User Info */}

                                <div>

                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-gray-900

                                            dark:text-white
                                        "
                                    >

                                        {user.first_name
                                            ? user.first_name
                                            : user.username}

                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-green-500

                                            dark:text-green-400
                                        "
                                    >

                                        ● Online

                                    </p>

                                </div>

                            </div>


                            {/* Logout */}

                            <button
                                onClick={logout}
                                className="
                                    rounded-xl
                                    border border-red-500/20
                                    bg-red-500/10
                                    px-4 py-2
                                    font-semibold
                                    text-red-500
                                    transition
                                    hover:bg-red-500/20

                                    dark:text-red-400
                                "
                            >

                                Logout

                            </button>

                        </>

                    ) : (

                        <>

                            {/* Login */}

                            <Link
                                to="/login"
                                className="
                                    rounded-xl
                                    border border-cyan-500
                                    px-5 py-2
                                    font-semibold
                                    text-cyan-600
                                    transition
                                    hover:bg-cyan-500
                                    hover:text-black

                                    dark:text-cyan-400
                                "
                            >

                                Login

                            </Link>


                            {/* Register */}

                            <Link
                                to="/login"
                                className="
                                    rounded-xl
                                    border border-cyan-500
                                    px-5 py-2
                                    font-semibold
                                    text-cyan-600
                                    transition
                                    hover:bg-cyan-500
                                    hover:text-black

                                    dark:text-cyan-400
                                "
                            >

                                Register

                            </Link>

                        </>

                    )}

                </div>

            </nav>

        </header>

    );

}

export default Navbar;