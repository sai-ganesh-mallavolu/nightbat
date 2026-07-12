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
            className="
        flex h-10 w-10
        items-center justify-center
        rounded-xl
        border border-gray-300
        bg-white
        text-gray-900
        transition-all duration-300
        hover:bg-gray-100

        dark:border-white/15
        dark:bg-[#0a0a0a]
        dark:text-white
        dark:hover:bg-[#171717]
      "
        >
            {isDark ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </button>
    );
}

export default ThemeToggle;