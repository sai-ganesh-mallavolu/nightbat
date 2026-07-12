function WelcomeScreen() {

    return (

        <div className="mt-20 text-center">


            {/* AI Icon */}

            <div className="text-7xl">
                🤖
            </div>


            {/* Welcome Heading */}

            <h2
                className="
                    mt-6
                    text-4xl
                    font-bold
                    text-slate-950

                    dark:text-white
                "
            >
                Welcome to NightBat AI
            </h2>


            {/* Description */}

            <p
                className="
                    mt-4
                    text-lg
                    text-slate-600

                    dark:text-zinc-400
                "
            >
                Ask anything about your uploaded document.
            </p>


            {/* Suggested Questions */}

            <div
                className="
                    mx-auto
                    mt-10
                    max-w-xl
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    text-left
                    shadow-sm
                    transition-colors
                    duration-300

                    dark:border-white/10
                    dark:bg-[#18181b]
                    dark:shadow-none
                "
            >

                <h3
                    className="
                        mb-4
                        text-xl
                        font-semibold
                        text-cyan-600

                        dark:text-cyan-400
                    "
                >
                    Try asking:
                </h3>


                <ul
                    className="
                        space-y-3
                        text-slate-700

                        dark:text-zinc-300
                    "
                >

                    <li>
                        📄 Summarize this document.
                    </li>

                    <li>
                        💡 Explain difficult concepts.
                    </li>

                    <li>
                        📚 What are the key points?
                    </li>

                    <li>
                        📝 Generate study notes.
                    </li>

                    <li>
                        🎯 Create quiz questions.
                    </li>

                    <li>
                        📖 Explain this like I'm a beginner.
                    </li>

                </ul>

            </div>

        </div>

    );

}

export default WelcomeScreen;