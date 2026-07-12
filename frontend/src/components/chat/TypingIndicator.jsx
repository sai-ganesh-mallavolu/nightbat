function TypingIndicator({ loadingText }) {

    return (

        <div className="flex justify-start">

            <div
                className="
                    max-w-lg
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-md
                    shadow-slate-200/50
                    transition-colors
                    duration-300

                    dark:border-white/10
                    dark:bg-[#18181b]
                    dark:shadow-none
                "
            >

                {/* AI Information */}

                <div className="mb-4 flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-50

                            dark:bg-cyan-500/10
                        "
                    >
                        🤖
                    </div>

                    <div>

                        <h4
                            className="
                                font-semibold
                                text-cyan-600

                                dark:text-cyan-400
                            "
                        >
                            NightBat AI
                        </h4>

                        <p
                            className="
                                text-xs
                                text-slate-500

                                dark:text-zinc-500
                            "
                        >
                            AI Assistant
                        </p>

                    </div>

                </div>


                {/* Loading Message */}

                <p
                    className="
                        mb-5
                        text-slate-700
                        transition-all
                        duration-500

                        dark:text-zinc-300
                    "
                >
                    {loadingText}
                </p>


                {/* Animated Dots */}

                <div className="flex gap-2">

                    <span
                        className="
                            h-3
                            w-3
                            animate-bounce
                            rounded-full
                            bg-cyan-500

                            dark:bg-cyan-400
                        "
                    />

                    <span
                        className="
                            h-3
                            w-3
                            animate-bounce
                            rounded-full
                            bg-cyan-500

                            dark:bg-cyan-400
                        "
                        style={{
                            animationDelay: "0.15s",
                        }}
                    />

                    <span
                        className="
                            h-3
                            w-3
                            animate-bounce
                            rounded-full
                            bg-cyan-500

                            dark:bg-cyan-400
                        "
                        style={{
                            animationDelay: "0.3s",
                        }}
                    />

                </div>

            </div>

        </div>

    );

}

export default TypingIndicator;