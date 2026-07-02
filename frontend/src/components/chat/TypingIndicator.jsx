function TypingIndicator({ loadingText }) {

    return (

        <div className="flex justify-start">

            <div className="max-w-lg rounded-2xl border border-cyan-500/20 bg-white/5 p-5 shadow-xl">

                <div className="mb-4 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">

                        🤖

                    </div>

                    <div>

                        <h4 className="font-semibold text-cyan-400">

                            NightBat AI

                        </h4>

                        <p className="text-xs text-gray-500">

                            AI Assistant

                        </p>

                    </div>

                </div>

                <p className="mb-5 text-gray-300 transition-all duration-500">

                    {loadingText}

                </p>

                <div className="flex gap-2">

                    <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-400"></span>

                    <span
                        className="h-3 w-3 animate-bounce rounded-full bg-cyan-400"
                        style={{ animationDelay: "0.15s" }}
                    ></span>

                    <span
                        className="h-3 w-3 animate-bounce rounded-full bg-cyan-400"
                        style={{ animationDelay: "0.3s" }}
                    ></span>

                </div>

            </div>

        </div>

    );

}

export default TypingIndicator;