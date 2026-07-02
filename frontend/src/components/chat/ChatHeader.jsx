function ChatHeader({ hasMessages, onClear }) {

    return (

        <div className="flex items-center justify-between border-b border-cyan-500/20 p-6">

            <div>

                <h2 className="text-3xl font-bold">

                    💬 Chat with this Document

                </h2>

                <p className="mt-2 text-sm text-gray-400">

                    Ask anything related to your uploaded document.

                </p>

            </div>

            {hasMessages && (

                <button
                    onClick={onClear}
                    className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
                >

                    🗑 Clear Chat

                </button>

            )}

        </div>

    );

}

export default ChatHeader;