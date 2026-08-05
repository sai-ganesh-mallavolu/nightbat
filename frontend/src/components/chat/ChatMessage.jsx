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
                    max-w-[95%]
                    sm:max-w-[90%]
                    md:max-w-[80%]
                    lg:max-w-[75%]
                    rounded-xl
                    sm:rounded-2xl
                    p-3
                    sm:p-4
                    lg:p-5
                    shadow-md
                    transition-all
                    duration-300

                    

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
                        gap-2
                        sm:gap-5
                    "
                >

                    <div className="flex items-center gap-2">

                        <span className="text-lg
                            sm:text-xl">

                            {isUser
                                ? "👤"
                                : "🤖"}

                        </span>

                        <span className="text-sm
                            sm:text-base
                            font-semibold">

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
                        overflow-x-auto
                        leading-6
                        sm:leading-7
                        text-sm
                        sm:text-base
                    "
                >

                    {message}

                </p>


                {/* Time */}

                <p
                    className={`
                        mt-3
                        sm:mt-4
                        text-[11px]
                        sm:text-xs

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