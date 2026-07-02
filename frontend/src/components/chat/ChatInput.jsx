function ChatInput({

    question,

    setQuestion,

    handleSend,

    loading,

}) {

    return (

        <div className="sticky bottom-0 border-t border-cyan-500/20 bg-gray-950 p-5">

            <div className="flex items-end gap-3">

                <textarea
                    rows={2}
                    value={question}
                    placeholder="Ask anything about this document..."
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter" &&
                            !e.shiftKey
                        ) {

                            e.preventDefault();

                            handleSend();

                        }

                    }}
                    className="max-h-40 min-h-[60px] flex-1 resize-none rounded-2xl border border-gray-700 bg-gray-900 px-5 py-4 outline-none transition focus:border-cyan-400"
                />

                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >

                    {loading ? "..." : "➜"}

                </button>

            </div>

            <p className="mt-3 text-center text-xs text-gray-500">

                Press <b>Enter</b> to send • <b>Shift + Enter</b> for a new line

            </p>

        </div>

    );

}

export default ChatInput;