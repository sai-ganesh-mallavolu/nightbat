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

            if (
                event.key === "Escape" &&
                !loading
            ) {

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

    }, [open, onCancel, loading]);


    if (!open) return null;


    return (

        <div

            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-slate-950/50
                px-4
                sm:px-6
                backdrop-blur-sm

                dark:bg-black/70
            "

            onClick={() => {

                if (!loading) {
                    onCancel();
                }

            }}

        >

            {/* Modal */}

            <div

                onClick={(e) =>
                    e.stopPropagation()
                }

                className="
                w-full
                max-w-md

                max-h-[90vh]
                overflow-y-auto

                animate-[fadeIn_.25s_ease]

                rounded-2xl
                sm:rounded-3xl

                border
                border-slate-200

                bg-white

                p-5
                sm:p-6
                lg:p-8

                shadow-2xl
                shadow-slate-950/20

                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-black/50
            "

            >


                {/* Delete Icon */}

                <div className="flex justify-center">

                    <div
                        className="
                            flex
                            h-16
                            w-16
                            sm:h-20
                            sm:w-20

                            text-4xl
                            sm:text-5xl
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-red-200
                            bg-red-50

                            dark:border-red-500/20
                            dark:bg-red-500/10
                        "
                    >

                        <span
                            className="
                                text-4xl
                                sm:text-5xl
                            "
                        >

                            🗑️

                        </span>

                    </div>

                </div>


                {/* Title */}

                <h2
                    className="
                        mt-6
                        text-center
                        text-2xl
                        sm:text-3xl
                        font-bold
                        text-slate-950

                        dark:text-white
                    "
                >

                    {title}

                </h2>


                {/* Message */}

                <p
                    className="
                        mt-5
                        text-center
                        text-sm
                        sm:text-base

                        leading-6
                        sm:leading-7
                        text-slate-600

                        dark:text-zinc-400
                    "
                >

                    {message}

                </p>


                {/* Buttons */}

                <div
                    className="
                        mt-8
                        sm:mt-10

                        flex
                        flex-col
                        gap-3

                        sm:flex-row
                        sm:gap-4
                    "
                >


                    {/* Cancel Button */}

                    <button

                        type="button"

                        onClick={onCancel}

                        disabled={loading}

                        className="
                            flex-1
                            cursor-pointer
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            py-2.5
                            sm:py-3

                            text-sm
                            sm:text-base
                            font-semibold
                            text-slate-700
                            transition-all
                            duration-300

                            hover:border-slate-400
                            hover:bg-slate-100

                            disabled:cursor-not-allowed
                            disabled:opacity-60

                            dark:border-white/15
                            dark:bg-white/5
                            dark:text-zinc-200

                            dark:hover:border-white/25
                            dark:hover:bg-white/10
                        "

                    >

                        {cancelText}

                    </button>


                    {/* Confirm / Delete Button */}

                    <button

                        type="button"

                        onClick={onConfirm}

                        disabled={loading}

                        className="
                            flex-1
                            cursor-pointer
                            rounded-xl
                            bg-red-500
                            py-2.5
                            sm:py-3

                            text-sm
                            sm:text-base
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-red-500/20
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-red-600
                            hover:shadow-xl
                            hover:shadow-red-500/25

                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            disabled:hover:translate-y-0
                        "

                    >

                        {
                            loading
                                ? "Deleting..."
                                : confirmText
                        }

                    </button>

                </div>


                {/* ESC Hint */}

                <p
                    className="
                        mt-6
                        text-center
                        text-[11px]
                        sm:text-xs
                        text-slate-400

                        dark:text-zinc-600
                    "
                >

                    Press{" "}

                    <b
                        className="
                            text-slate-600

                            dark:text-zinc-400
                        "
                    >
                        Esc
                    </b>

                    {" "}to close

                </p>

            </div>

        </div>

    );

}

export default ConfirmModal;