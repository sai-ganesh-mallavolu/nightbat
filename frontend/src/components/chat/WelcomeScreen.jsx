function WelcomeScreen() {

    return (

        <div className="mt-20 text-center">

            <div className="text-7xl">

                🤖

            </div>

            <h2 className="mt-6 text-4xl font-bold">

                Welcome to NightBat AI

            </h2>

            <p className="mt-4 text-lg text-gray-400">

                Ask anything about your uploaded document.

            </p>

            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-cyan-500/20 bg-white/5 p-6 text-left">

                <h3 className="mb-4 text-xl font-semibold text-cyan-400">

                    Try asking:

                </h3>

                <ul className="space-y-3 text-gray-300">

                    <li>📄 Summarize this document.</li>

                    <li>💡 Explain difficult concepts.</li>

                    <li>📚 What are the key points?</li>

                    <li>📝 Generate study notes.</li>

                    <li>🎯 Create quiz questions.</li>

                    <li>📖 Explain this like I'm a beginner.</li>

                </ul>

            </div>

        </div>

    );

}

export default WelcomeScreen;