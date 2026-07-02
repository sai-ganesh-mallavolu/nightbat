import { Link } from "react-router-dom";

function HistoryCard({ document, onDelete }) {

    const extension = document.filename
        .split(".")
        .pop()
        .toLowerCase();

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

    const getRelativeTime = () => {

        const now = new Date();

        const upload = new Date(document.uploaded_at);

        const diff = now - upload;

        const minutes = Math.floor(diff / 60000);

        const hours = Math.floor(diff / 3600000);

        const days = Math.floor(diff / 86400000);

        if (minutes < 1)
            return "Just now";

        if (minutes < 60)
            return `${minutes} min ago`;

        if (hours < 24)
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;

        if (days === 1)
            return "Yesterday";

        if (days < 7)
            return `${days} days ago`;

        return upload.toLocaleDateString();

    };

    return (

        <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-500/20">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}

                <div className="flex items-start gap-5">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-4xl">

                        {getIcon()}

                    </div>

                    <div>

                        <h2 className="break-all text-2xl font-bold text-white">

                            {document.filename}

                        </h2>

                        <p className="mt-2 text-sm uppercase tracking-widest text-gray-500">

                            {extension.toUpperCase()} • {getRelativeTime()}

                        </p>

                        <div className="mt-4">

                            {document.has_analysis ? (

                                <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm font-semibold text-green-400">

                                    🟢 Ready

                                </span>

                            ) : (

                                <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm font-semibold text-yellow-400">

                                    🟡 Needs Analysis

                                </span>

                            )}

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-3">

                    <Link
                        to={`/history/${document.id}`}
                        className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
                    >

                        {document.has_analysis
                            ? "🚀 Open"
                            : "🤖 Analyze"}

                    </Link>

                    <button
                        onClick={() => onDelete(document.id)}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-xl transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white"
                    >

                        🗑️

                    </button>

                </div>

            </div>

        </div>

    );

}

export default HistoryCard;