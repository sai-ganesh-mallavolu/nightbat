function FlashcardControls({

    previousCard,

    nextCard,

    shuffleCards,

    markLearned,

    learned,

    isFirst,

    isLast,

    showFinish,

    onFinish,

}) {

    return (

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

            {/* Previous */}

            <button

                onClick={previousCard}

                disabled={isFirst}

                className={`w-56 rounded-xl px-6 py-3 font-semibold transition duration-300

                ${isFirst

                        ? "cursor-not-allowed bg-slate-700/40 text-gray-500"

                        : "bg-slate-700 text-white hover:bg-slate-600 hover:scale-105"

                    }`}

            >

                ⬅ Previous

            </button>

            {/* Mark as Learned */}

            <button
                onClick={markLearned}
                disabled={learned}
                className={`w-56 rounded-xl px-6 py-3 font-semibold transition duration-300 hover:scale-105
    ${learned
                        ? "cursor-not-allowed bg-green-500 text-white"
                        : "bg-amber-500 text-black hover:bg-amber-400"
                    }`}
            >
                {learned ? "✅ Learned" : "⭐ Mark as Learned"}
            </button>

            {/* Shuffle */}

            <button

                onClick={shuffleCards}

                className="w-56 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-violet-500 hover:scale-105"

            >

                🔀 Shuffle

            </button>

            {/* Next / Finish */}

            {

                showFinish ? (

                    <button

                        onClick={onFinish}

                        className="w-56 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-green-400 hover:scale-105"

                    >

                        🏁 Finish Study

                    </button>

                ) : (

                    <button

                        onClick={nextCard}

                        disabled={isLast}

                        className={`w-56 rounded-xl px-6 py-3 font-semibold transition duration-300

                        ${isLast

                                ? "cursor-not-allowed bg-cyan-500/40 text-gray-500"

                                : "bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-105"

                            }`}

                    >

                        Next ➜

                    </button>

                )

            }

        </div>

    );

}

export default FlashcardControls;