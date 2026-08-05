import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {

    const { theme, toggleTheme } = useTheme();

    const isDark = theme === "dark";

    return (

        <button
            type="button"
            onClick={toggleTheme}

            aria-label={
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }

            title={
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }

            aria-pressed={isDark}

            className="
                group
                flex

                h-10
                w-10

                sm:h-11
                sm:w-11

                items-center
                justify-center

                rounded-xl

                border
                border-gray-300

                bg-white

                text-gray-900

                transition-all
                duration-300

                hover:scale-105
                hover:bg-gray-100

                active:scale-95

                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
                focus:ring-offset-2

                dark:border-white/15
                dark:bg-[#0a0a0a]
                dark:text-white
                dark:hover:bg-[#171717]

                dark:focus:ring-cyan-400
                dark:focus:ring-offset-black
            "
        >

            {isDark ? (

                <Sun
                    size={20}
                    className="
                        transition-transform
                        duration-300
                        group-hover:rotate-12
                    "
                />

            ) : (

                <Moon
                    size={20}
                    className="
                        transition-transform
                        duration-300
                        group-hover:-rotate-12
                    "
                />

            )}

        </button>

    );

}

export default ThemeToggle;