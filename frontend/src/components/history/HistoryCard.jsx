import { Link } from "react-router-dom";

function HistoryCard({ document, onDelete }) {

    const extension = document.filename
        .split(".")
        .pop()
        .toLowerCase();


    // ==========================
    // File Icon
    // ==========================

    const getIcon = () => {

        switch (extension) {

            case "pdf":
                return "📕";

            case "doc":
            case "docx":
                return "📘";

            case "txt":
                return "📄";

            default:
                return "📁";

        }

    };


    // ==========================
    // Relative Upload Time
    // ==========================

    const getRelativeTime = () => {

        const now = new Date();

        const upload = new Date(
            document.uploaded_at
        );

        const diff = now - upload;

        const minutes =
            Math.floor(diff / 60000);

        const hours =
            Math.floor(diff / 3600000);

        const days =
            Math.floor(diff / 86400000);


        if (minutes < 1) {
            return "Just now";
        }

        if (minutes < 60) {
            return `${minutes} min ago`;
        }

        if (hours < 24) {

            return `${hours} hour${hours > 1 ? "s" : ""
                } ago`;

        }

        if (days === 1) {
            return "Yesterday";
        }

        if (days < 7) {
            return `${days} days ago`;
        }

        return upload.toLocaleDateString();

    };


    return (

        <div
            className="
                group

                rounded-2xl
                sm:rounded-3xl

                border border-slate-200
                bg-white

                p-5
                sm:p-6

                shadow-md
                shadow-slate-200/60
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-cyan-400
                hover:shadow-xl
                hover:shadow-cyan-500/10

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none

                dark:hover:border-cyan-400/40
                dark:hover:bg-[#1f1f23]
                dark:hover:shadow-lg
                dark:hover:shadow-cyan-500/10
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-6

                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* ==========================
                    Left Side
                ========================== */}

                <div className="flex items-start gap-4 sm:gap-5">

                    {/* File Icon */}

                    <div
                        className="
                            flex

                            h-14
                            w-14

                            sm:h-16
                            sm:w-16

                            shrink-0
                            items-center
                            justify-center

                            rounded-xl
                            sm:rounded-2xl

                            bg-cyan-50

                            text-3xl
                            sm:text-4xl

                            transition-colors
                            duration-300

                            dark:bg-cyan-500/10
                        "
                    >

                        {getIcon()}

                    </div>


                    {/* Document Information */}

                    <div className="min-w-0">

                        {/* File Name */}

                        <h2
                            className="
                                break-all

                                text-xl
                                sm:text-2xl

                                font-bold
                                text-slate-950

                                dark:text-white
                            "
                        >

                            {document.filename}

                        </h2>


                        {/* File Type & Upload Time */}

                        <p
                            className="
                                mt-2
                                text-sm
                                font-medium
                                uppercase
                                tracking-widest
                                text-slate-500

                                dark:text-zinc-500
                            "
                        >

                            {extension.toUpperCase()}
                            {" • "}
                            {getRelativeTime()}

                        </p>


                        {/* Analysis Status */}

                        <div className="mt-4">

                            {document.has_analysis ? (

                                <span
                                    className="
                                        inline-flex
                                        items-center

                                        rounded-full

                                        border
                                        border-green-200

                                        bg-green-50

                                        px-3
                                        sm:px-4

                                        py-1

                                        text-xs
                                        sm:text-sm

                                        font-semibold
                                        text-green-700

                                        dark:border-green-500/30
                                        dark:bg-green-500/10
                                        dark:text-green-400
                                    "
                                >

                                    🟢 Ready

                                </span>

                            ) : (

                                <span
                                    className="
                                        inline-flex
                                        items-center

                                        rounded-full

                                        border
                                        border-amber-200

                                        bg-amber-50

                                        px-3
                                        sm:px-4

                                        py-1

                                        text-xs
                                        sm:text-sm

                                        font-semibold
                                        text-amber-700

                                        dark:border-yellow-500/30
                                        dark:bg-yellow-500/10
                                        dark:text-yellow-400
                                    "
                                >

                                    🟡 Needs Analysis

                                </span>

                            )}

                        </div>

                    </div>

                </div>


                {/* ==========================
                    Right Side
                ========================== */}

                <div
                    className="
                        flex

                        w-full
                        flex-col

                        gap-3

                        sm:w-auto
                        sm:flex-row
                        sm:items-center

                        lg:shrink-0
                    "
                >

                    {/* Open / Analyze Button */}

                    <Link
                        to={`/history/${document.id}`}
                        className="
                            w-full
                            sm:w-auto

                            rounded-xl

                            bg-cyan-500

                            px-5
                            sm:px-6

                            py-3

                            text-center
                            text-sm
                            sm:text-base

                            font-semibold
                            text-slate-950

                            shadow-sm

                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-cyan-400
                            hover:shadow-lg
                            hover:shadow-cyan-500/20

                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-500
                            focus:ring-offset-2

                            dark:focus:ring-cyan-400
                            dark:focus:ring-offset-[#09090b]
                        "
                    >

                        {document.has_analysis
                            ? "🚀 Open"
                            : "🤖 Analyze"}

                    </Link>


                    {/* Delete Button */}

                    <button
                        type="button"
                        onClick={() =>
                            onDelete(document.id)
                        }
                        className="
                            flex

                            h-11
                            w-full

                            sm:h-12
                            sm:w-12

                            cursor-pointer
                            items-center
                            justify-center

                            rounded-xl

                            border
                            border-red-200

                            bg-red-50

                            text-xl

                            transition-all
                            duration-300

                            hover:scale-105
                            hover:border-red-400
                            hover:bg-red-500
                            hover:text-white

                            focus:outline-none
                            focus:ring-2
                            focus:ring-red-500
                            focus:ring-offset-2

                            dark:border-red-500/30
                            dark:bg-red-500/10
                            dark:hover:bg-red-500

                            dark:focus:ring-red-400
                            dark:focus:ring-offset-[#09090b]
                        "
                        aria-label={`Delete ${document.filename}`}
                    >

                        🗑️

                    </button>

                </div>

            </div>

        </div>

    );

}

export default HistoryCard;