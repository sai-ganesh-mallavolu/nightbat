function FlashcardControls({

    previousCard,

    nextCard,

    shuffleCards,

    markLearned,

    markingLearned,

    learned,

    isFirst,

    isLast,

    showFinish,

    onFinish,

}) {

    return (

        <div
            className="
                mt-10
                flex
                flex-wrap
                items-center
                justify-center
                gap-4
            "
        >

            {/* Previous */}

            <button
                type="button"
                onClick={previousCard}
                disabled={isFirst}
                className={`
                    w-56
                    rounded-xl
                    border
                    px-6
                    py-3
                    font-semibold
                    transition-all
                    duration-300

                    ${isFirst

                        ? `
                                cursor-not-allowed
                                border-slate-200
                                bg-slate-100
                                text-slate-400

                                dark:border-white/5
                                dark:bg-zinc-800/60
                                dark:text-zinc-600
                            `

                        : `
                                cursor-pointer
                                border-slate-300
                                bg-white
                                text-slate-700
                                shadow-sm

                                hover:-translate-y-0.5
                                hover:border-slate-400
                                hover:bg-slate-100

                                dark:border-white/10
                                dark:bg-zinc-700
                                dark:text-white

                                dark:hover:bg-zinc-600
                            `
                    }
                `}
            >

                ⬅ Previous

            </button>


            {/* Mark as Learned */}

            <button
                type="button"
                onClick={markLearned}
                disabled={
                    learned ||
                    markingLearned
                }
                className={`
                    w-56
                    rounded-xl
                    border
                    px-6
                    py-3
                    font-semibold
                    transition-all
                    duration-300

                    ${learned

                        ? `
                                cursor-not-allowed
                                border-green-500
                                bg-green-500
                                text-white
                            `

                        : markingLearned

                            ? `
                                    cursor-wait
                                    border-amber-400
                                    bg-amber-400/70
                                    text-slate-950
                                `

                            : `
                                    cursor-pointer
                                    border-amber-500
                                    bg-amber-500
                                    text-slate-950
                                    shadow-sm
                                    shadow-amber-500/20

                                    hover:-translate-y-0.5
                                    hover:bg-amber-400
                                    hover:shadow-md
                                `
                    }
                `}
            >

                {
                    learned

                        ? "✅ Learned"

                        : markingLearned

                            ? "⏳ Updating..."

                            : "⭐ Mark as Learned"
                }

            </button>


            {/* Shuffle */}

            <button
                type="button"
                onClick={shuffleCards}
                className="
                    w-56
                    cursor-pointer
                    rounded-xl
                    bg-violet-600
                    px-6
                    py-3
                    font-semibold
                    text-white
                    shadow-sm
                    shadow-violet-500/20
                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-violet-500
                    hover:shadow-md
                "
            >

                🔀 Shuffle

            </button>


            {/* Next / Finish */}

            {showFinish ? (

                <button
                    type="button"
                    onClick={onFinish}
                    className="
                        w-56
                        cursor-pointer
                        rounded-xl
                        bg-green-500
                        px-6
                        py-3
                        font-semibold
                        text-white
                        shadow-sm
                        shadow-green-500/20
                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-green-400
                        hover:shadow-md
                    "
                >

                    🏁 Finish Study

                </button>

            ) : (

                <button
                    type="button"
                    onClick={nextCard}
                    disabled={isLast}
                    className={`
                        w-56
                        rounded-xl
                        border
                        px-6
                        py-3
                        font-semibold
                        transition-all
                        duration-300

                        ${isLast

                            ? `
                                    cursor-not-allowed
                                    border-cyan-200
                                    bg-cyan-100
                                    text-cyan-400

                                    dark:border-cyan-500/10
                                    dark:bg-cyan-500/10
                                    dark:text-zinc-600
                                `

                            : `
                                    cursor-pointer
                                    border-cyan-500
                                    bg-cyan-500
                                    text-slate-950
                                    shadow-sm
                                    shadow-cyan-500/20

                                    hover:-translate-y-0.5
                                    hover:bg-cyan-400
                                    hover:shadow-md
                                `
                        }
                    `}
                >

                    Next ➜

                </button>

            )}

        </div>

    );

}

export default FlashcardControls;