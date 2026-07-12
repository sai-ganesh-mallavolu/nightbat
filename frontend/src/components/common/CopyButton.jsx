import { toast } from "react-toastify";

function CopyButton({ text }) {

    const handleCopy = async () => {

        try {

            await navigator.clipboard.writeText(text);

            toast.success(
                "Copied to clipboard! 📋"
            );

        }

        catch (error) {

            console.error(
                "Failed to copy:",
                error
            );

            toast.error(
                "Failed to copy."
            );

        }

    };


    return (

        <button
            type="button"
            onClick={handleCopy}
            className="
                shrink-0
                cursor-pointer
                rounded-lg
                bg-cyan-500
                px-3
                py-2
                text-sm
                font-semibold
                text-slate-950
                shadow-sm
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-cyan-400
                hover:shadow-md
                hover:shadow-cyan-500/20

                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500/40
                focus:ring-offset-2

                dark:focus:ring-offset-[#18181b]
            "
        >

            📋 Copy

        </button>

    );

}

export default CopyButton;