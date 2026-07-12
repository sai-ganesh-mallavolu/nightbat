function ChatHeader({
    hasMessages,
    onClear,
}) {

    return (

        <div
            className="
                flex
                flex-col
                gap-5
                border-b
                border-slate-200
                p-6

                sm:flex-row
                sm:items-center
                sm:justify-between

                dark:border-white/10
            "
        >

            {/* Header Information */}

            <div>

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-slate-950

                        dark:text-white
                    "
                >
                    💬 Chat with this Document
                </h2>

                <p
                    className="
                        mt-2
                        text-sm
                        text-slate-600

                        dark:text-zinc-400
                    "
                >
                    Ask anything related to your uploaded document.
                </p>

            </div>


            {/* Clear Chat Button */}

            {hasMessages && (

                <button
                    type="button"
                    onClick={onClear}
                    className="
                        shrink-0
                        cursor-pointer
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-2
                        font-semibold
                        text-red-600
                        transition-all
                        duration-300

                        hover:border-red-500
                        hover:bg-red-500
                        hover:text-white

                        dark:border-red-500/30
                        dark:bg-red-500/10
                        dark:text-red-400

                        dark:hover:bg-red-500
                        dark:hover:text-white
                    "
                >
                    🗑 Clear Chat
                </button>

            )}

        </div>

    );

}

export default ChatHeader;