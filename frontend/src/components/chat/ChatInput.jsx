function ChatInput({

    question,

    setQuestion,

    handleSend,

    loading,

}) {

    return (

        <div
            className="
                sticky
                bottom-0
                border-t
                border-slate-200
                bg-white
                p-5
                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#18181b]
            "
        >

            <div className="flex items-end gap-3">


                {/* Message Input */}

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
                    className="
                        max-h-40
                        min-h-[60px]
                        flex-1
                        resize-none
                        rounded-2xl
                        border
                        border-slate-300
                        bg-slate-50
                        px-5
                        py-4
                        text-slate-900
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-slate-400

                        focus:border-cyan-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-cyan-500/10

                        dark:border-white/10
                        dark:bg-[#111113]
                        dark:text-white
                        dark:placeholder:text-zinc-500

                        dark:focus:border-cyan-400
                        dark:focus:bg-[#111113]
                        dark:focus:ring-cyan-400/10
                    "
                />


                {/* Send Button */}

                <button
                    type="button"
                    onClick={handleSend}
                    disabled={
                        loading ||
                        !question.trim()
                    }
                    className="
                        flex
                        h-[60px]
                        min-w-[64px]
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-2xl
                        bg-cyan-500
                        px-6
                        text-xl
                        font-semibold
                        text-slate-950
                        shadow-md
                        shadow-cyan-500/20
                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-cyan-400
                        hover:shadow-lg
                        hover:shadow-cyan-500/25

                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        disabled:hover:translate-y-0
                    "
                >

                    {loading
                        ? "..."
                        : "➜"}

                </button>

            </div>


            {/* Keyboard Hint */}

            <p
                className="
                    mt-3
                    text-center
                    text-xs
                    text-slate-400

                    dark:text-zinc-500
                "
            >

                Press{" "}

                <b className="text-slate-600 dark:text-zinc-300">
                    Enter
                </b>

                {" "}to send •{" "}

                <b className="text-slate-600 dark:text-zinc-300">
                    Shift + Enter
                </b>

                {" "}for a new line

            </p>

        </div>

    );

}

export default ChatInput;