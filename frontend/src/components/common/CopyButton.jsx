import { toast } from "react-toastify";

function CopyButton({ text }) {

    const handleCopy = async () => {

        try {

            await navigator.clipboard.writeText(text);

            toast.success("Copied to clipboard! 📋");

        } catch {

            toast.error("Failed to copy.");

        }

    };

    return (

        <button
            onClick={handleCopy}
            className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
        >

            📋 Copy

        </button>

    );

}

export default CopyButton;