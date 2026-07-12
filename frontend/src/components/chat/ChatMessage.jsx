import CopyButton from "../common/CopyButton";

function ChatMessage({ sender, message }) {

    const isUser = sender === "user";

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (

        <div
            className={`
                flex
                ${isUser
                    ? "justify-end"
                    : "justify-start"
                }
            `}
        >

            <div
                className={`
                    max-w-[85%]
                    rounded-2xl
                    p-5
                    shadow-md
                    transition-all
                    duration-300

                    sm:max-w-[80%]

                    ${isUser

                        ? `
                                bg-cyan-500
                                text-slate-950
                                shadow-cyan-500/10
                            `

                        : `
                                border
                                border-slate-200
                                bg-white
                                text-slate-800
                                shadow-slate-200/50

                                dark:border-white/10
                                dark:bg-[#18181b]
                                dark:text-zinc-200
                                dark:shadow-none
                            `
                    }
                `}
            >


                {/* Message Header */}

                <div
                    className="
                        mb-3
                        flex
                        items-center
                        justify-between
                        gap-5
                    "
                >

                    <div className="flex items-center gap-2">

                        <span className="text-xl">

                            {isUser
                                ? "👤"
                                : "🤖"}

                        </span>

                        <span className="font-semibold">

                            {isUser
                                ? "You"
                                : "NightBat AI"}

                        </span>

                    </div>


                    {/* Copy AI Response */}

                    {!isUser && (

                        <CopyButton
                            text={message}
                        />

                    )}

                </div>


                {/* Message */}

                <p
                    className="
                        whitespace-pre-wrap
                        break-words
                        leading-7
                    "
                >

                    {message}

                </p>


                {/* Time */}

                <p
                    className={`
                        mt-4
                        text-xs

                        ${isUser
                            ? "text-slate-800/70"
                            : "text-slate-400 dark:text-zinc-500"
                        }
                    `}
                >

                    {time}

                </p>

            </div>

        </div>

    );

}

export default ChatMessage;