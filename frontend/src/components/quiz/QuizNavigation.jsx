function QuizNavigation({

    current,

    total,

    previousQuestion,

    nextQuestion,

    submitQuiz,

}) {

    const isFirst =
        current === 0;

    const isLast =
        current === total - 1;


    return (

        <div
            className="
                mt-10
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
            "
        >


            {/* Previous */}

            <button
                type="button"
                onClick={previousQuestion}
                disabled={isFirst}
                className={`
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


            {/* Next / Submit */}

            {isLast ? (

                <button
                    type="button"
                    onClick={submitQuiz}
                    className="
                        cursor-pointer
                        rounded-xl
                        border
                        border-green-500
                        bg-green-500
                        px-8
                        py-3
                        font-semibold
                        text-white
                        shadow-md
                        shadow-green-500/20
                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-green-400
                        hover:shadow-lg
                    "
                >

                    ✅ Submit Quiz

                </button>

            ) : (

                <button
                    type="button"
                    onClick={nextQuestion}
                    className="
                        cursor-pointer
                        rounded-xl
                        border
                        border-cyan-500
                        bg-cyan-500
                        px-8
                        py-3
                        font-semibold
                        text-slate-950
                        shadow-md
                        shadow-cyan-500/20
                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-cyan-400
                        hover:shadow-lg
                    "
                >

                    Next ➜

                </button>

            )}

        </div>

    );

}

export default QuizNavigation;