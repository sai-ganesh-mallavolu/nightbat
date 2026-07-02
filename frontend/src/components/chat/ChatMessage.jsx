import CopyButton from "../common/CopyButton";

function ChatMessage({ sender, message }) {

    const isUser = sender === "user";

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (

        <div
            className={`flex ${isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
        >

            <div
                className={`max-w-[80%] rounded-2xl p-5 shadow-xl transition-all duration-300 hover:shadow-cyan-500/10 ${isUser
                        ? "bg-cyan-500 text-black"
                        : "border border-cyan-500/20 bg-white/5 text-white"
                    }`}
            >

                <div className="mb-3 flex items-center justify-between gap-5">

                    <div className="flex items-center gap-2">

                        <span className="text-xl">

                            {isUser ? "👤" : "🤖"}

                        </span>

                        <span className="font-semibold">

                            {isUser
                                ? "You"
                                : "NightBat AI"}

                        </span>

                    </div>

                    {!isUser && (

                        <CopyButton text={message} />

                    )}

                </div>

                <p className="whitespace-pre-wrap leading-7">

                    {message}

                </p>

                <p
                    className={`mt-4 text-xs ${isUser
                            ? "text-black/70"
                            : "text-gray-500"
                        }`}
                >

                    {time}

                </p>

            </div>

        </div>

    );

}

export default ChatMessage;