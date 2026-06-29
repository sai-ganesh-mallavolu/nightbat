import { Link } from "react-router-dom";
import { APP_NAME, NAV_LINKS } from "../../constants/appConstants";

function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    to="/"
                    className="text-2xl font-bold text-cyan-400"
                >
                    🦇 {APP_NAME}
                </Link>

                <div className="flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="transition hover:text-cyan-400"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;