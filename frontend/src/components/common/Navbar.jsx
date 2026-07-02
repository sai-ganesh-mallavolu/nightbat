import { Link } from "react-router-dom";

import { APP_NAME, NAV_LINKS } from "../../constants/appConstants";

import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    return (

        <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">

            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}

                <Link
                    to="/"
                    className="text-2xl font-bold text-cyan-400"
                >
                    🦇 {APP_NAME}
                </Link>

                {/* Navigation */}

                <div className="flex items-center gap-8">

                    {/* Home always visible */}

                    <Link
                        to="/"
                        className="transition hover:text-cyan-400"
                    >
                        Home
                    </Link>

                    {/* Upload & History only after login */}

                    {user &&
                        NAV_LINKS.filter(
                            (link) => link.path !== "/"
                        ).map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="transition hover:text-cyan-400"
                            >
                                {link.name}
                            </Link>
                        ))}

                </div>

                {/* Right Side */}

                <div className="flex items-center gap-4">

                    {user ? (

                        <>

                            {/* User Card */}

                            <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-white/5 px-4 py-2">

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-black">

                                    {user.username.charAt(0).toUpperCase()}

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-white">

                                        {user.first_name
                                            ? user.first_name
                                            : user.username}

                                    </p>

                                    <p className="text-xs text-green-400">

                                        ● Online

                                    </p>

                                </div>

                            </div>

                            {/* Logout */}

                            <button

                                onClick={logout}

                                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 font-semibold text-red-400 transition hover:bg-red-500/20"

                            >

                                Logout

                            </button>

                        </>

                    ) : (

                        <>

                            <Link

                                to="/login"

                                className="rounded-xl border border-cyan-500 px-5 py-2 font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black"

                            >

                                Login

                            </Link>

                            <Link

                                to="/register"

                                className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black transition hover:bg-cyan-400"

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