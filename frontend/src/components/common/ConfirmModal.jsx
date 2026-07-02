import { useEffect } from "react";

function ConfirmModal({

    open,

    title,

    message,

    onCancel,

    onConfirm,

    confirmText = "Confirm",

    cancelText = "Cancel",

    loading = false,

}) {

    useEffect(() => {

        if (!open) return;

        const handleEscape = (event) => {

            if (event.key === "Escape") {

                onCancel();

            }

        };

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, [open, onCancel]);

    if (!open) return null;

    return (

        <div

            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"

            onClick={onCancel}

        >

            <div

                onClick={(e) => e.stopPropagation()}

                className="w-full max-w-md animate-[fadeIn_.25s_ease] rounded-3xl border border-cyan-500/20 bg-gray-900 p-8 shadow-2xl"

            >

                {/* Icon */}

                <div className="flex justify-center">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">

                        <span className="text-5xl">

                            🗑️

                        </span>

                    </div>

                </div>

                {/* Title */}

                <h2 className="mt-6 text-center text-3xl font-bold">

                    {title}

                </h2>

                {/* Message */}

                <p className="mt-5 text-center leading-7 text-gray-400">

                    {message}

                </p>

                {/* Buttons */}

                <div className="mt-10 flex gap-4">

                    <button

                        onClick={onCancel}

                        disabled={loading}

                        className="flex-1 rounded-xl border border-gray-600 py-3 font-semibold transition duration-300 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"

                    >

                        {cancelText}

                    </button>

                    <button

                        onClick={onConfirm}

                        disabled={loading}

                        className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white transition duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"

                    >

                        {

                            loading

                                ? "Deleting..."

                                : confirmText

                        }

                    </button>

                </div>

                {/* ESC Hint */}

                <p className="mt-6 text-center text-xs text-gray-500">

                    Press <b>Esc</b> to close

                </p>

            </div>

        </div>

    );

}

export default ConfirmModal;