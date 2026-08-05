import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import {
    APP_NAME,
    NAV_LINKS,
} from "../../constants/appConstants";

import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle";

function Navbar() {

    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }

        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return (

        <header
            className="
                sticky
                top-0
                z-50

                border-b
                border-gray-200

                bg-white/80
                backdrop-blur-md

                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-black/80
            "
        >

            <nav
                className="
                    mx-auto
                    flex
                    h-16
                    max-w-7xl
                    items-center
                    justify-between

                    px-4
                    sm:px-6
                    lg:px-8
                "
            >

                {/* Logo */}

                <Link
                    to="/"
                    className="
                        flex
                        items-center

                        whitespace-nowrap

                        text-lg
                        sm:text-xl
                        lg:text-2xl

                        font-bold

                        text-cyan-500

                        transition-colors
                        duration-300

                        hover:text-cyan-600

                        dark:text-cyan-400
                    "
                >
                    🦇 {APP_NAME}
                </Link>

                {/* Desktop Navigation */}

                <div
                    className="
                        hidden
                        md:flex
                        items-center
                        gap-6
                        lg:gap-8
                    "
                >

                    <Link
                        to="/"
                        className="
                            font-medium
                            text-gray-700
                            transition-colors

                            hover:text-cyan-500

                            dark:text-gray-200
                            dark:hover:text-cyan-400
                        "
                    >
                        Home
                    </Link>

                    {user &&
                        NAV_LINKS
                            .filter(link => link.path !== "/")
                            .map(link => (

                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="
                                        font-medium
                                        text-gray-700
                                        transition-colors

                                        hover:text-cyan-500

                                        dark:text-gray-200
                                        dark:hover:text-cyan-400
                                    "
                                >
                                    {link.name}
                                </Link>

                            ))}

                </div>

                {/* Desktop Right */}

                <div
                    className="
                        hidden
                        md:flex
                        items-center
                        gap-4
                    "
                >

                    <ThemeToggle />

                    {user ? (

                        <>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3

                                    rounded-xl

                                    border
                                    border-gray-200

                                    bg-gray-50

                                    px-4
                                    py-2

                                    transition-colors
                                    duration-300

                                    dark:border-white/10
                                    dark:bg-[#0a0a0a]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center

                                        rounded-full

                                        bg-cyan-500

                                        font-bold

                                        text-black
                                    "
                                >

                                    {user.username
                                        .charAt(0)
                                        .toUpperCase()}

                                </div>

                                <div>

                                    <p
                                        className="
                                            font-semibold

                                            dark:text-white
                                        "
                                    >
                                        {user.first_name || user.username}
                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-green-500
                                        "
                                    >
                                        ● Online
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={logout}
                                className="
                                    rounded-xl

                                    bg-red-500/10

                                    px-4
                                    py-2

                                    font-semibold

                                    text-red-500

                                    transition-all
                                    duration-300

                                    hover:bg-red-500/20
                                "
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link
                                to="/login"
                                className="
                                rounded-xl

                                border
                                border-cyan-500

                                px-5
                                py-2

                                font-semibold

                                text-cyan-500

                                transition-all
                                duration-300

                                hover:bg-cyan-500
                                hover:text-black
                            "
                            >
                                Login
                            </Link>

                            <Link
                                to="/login"
                                className="
                                rounded-xl

                                bg-cyan-500

                                px-5
                                py-2

                                font-semibold

                                text-black

                                transition-all
                                duration-300

                                hover:opacity-90
                            "
                            >
                                Register
                            </Link>

                        </>

                    )}

                </div>

                {/* Mobile Right */}

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        sm:gap-3

                        md:hidden
                    "
                >

                    <ThemeToggle />

                    <button
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="
                            rounded-lg

                            p-2

                            transition-colors
                            duration-300

                            hover:bg-slate-100

                            dark:hover:bg-white/10
                        "
                    >
                        {menuOpen
                            ? <X size={26} />
                            : <Menu size={26} />}
                    </button>

                </div>

            </nav>

            {menuOpen && (

                <div
                    className="
            border-t
            border-gray-200

            bg-white

            md:hidden

            transition-colors
            duration-300

            dark:border-white/10
            dark:bg-black
        "
                >

                    <div
                        className="
                flex
                flex-col

                gap-5

                px-5
                py-6
            "
                    >

                        {/* Home */}

                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className="
                    text-base
                    font-medium

                    transition-colors

                    hover:text-cyan-500

                    dark:text-white
                    dark:hover:text-cyan-400
                "
                        >
                            Home
                        </Link>

                        {/* Protected Links */}

                        {user &&
                            NAV_LINKS
                                .filter(link => link.path !== "/")
                                .map(link => (

                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setMenuOpen(false)}
                                        className="
                                text-base
                                font-medium

                                transition-colors

                                hover:text-cyan-500

                                dark:text-white
                                dark:hover:text-cyan-400
                            "
                                    >
                                        {link.name}
                                    </Link>

                                ))}

                        {user ? (

                            <>

                                {/* User Card */}

                                <div
                                    className="
                            mt-2

                            flex
                            items-center
                            gap-3

                            rounded-2xl

                            border
                            border-gray-200

                            bg-gray-50

                            p-4

                            transition-colors
                            duration-300

                            dark:border-white/10
                            dark:bg-[#0a0a0a]
                        "
                                >

                                    <div
                                        className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center

                                rounded-full

                                bg-cyan-500

                                font-bold

                                text-black
                            "
                                    >

                                        {user.username
                                            .charAt(0)
                                            .toUpperCase()}

                                    </div>

                                    <div className="min-w-0">

                                        <p
                                            className="
                                    truncate

                                    font-semibold

                                    dark:text-white
                                "
                                        >
                                            {user.first_name || user.username}
                                        </p>

                                        <p
                                            className="
                                    text-xs
                                    text-green-500
                                "
                                        >
                                            ● Online
                                        </p>

                                    </div>

                                </div>

                                <button
                                    onClick={() => {

                                        logout();
                                        setMenuOpen(false);

                                    }}
                                    className="
                            w-full

                            rounded-xl

                            bg-red-500

                            py-3

                            font-semibold

                            text-white

                            transition-all
                            duration-300

                            hover:bg-red-600
                        "
                                >
                                    Logout
                                </button>

                            </>

                        ) : (

                            <>

                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="
                            w-full

                            rounded-xl

                            border
                            border-cyan-500

                            py-3

                            text-center

                            font-semibold

                            text-cyan-500

                            transition-all
                            duration-300

                            hover:bg-cyan-500
                            hover:text-black
                        "
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="
                            w-full

                            rounded-xl

                            bg-cyan-500

                            py-3

                            text-center

                            font-semibold

                            text-black

                            transition-all
                            duration-300

                            hover:opacity-90
                        "
                                >
                                    Register
                                </Link>

                            </>

                        )}

                    </div>

                </div>

            )}

        </header>

    );

}

export default Navbar;