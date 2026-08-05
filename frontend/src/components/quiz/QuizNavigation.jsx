function QuizNavigation({

    current,

    total,

    previousQuestion,

    nextQuestion,

    submitQuiz,

}) {

    const isFirst = current === 0;

    const isLast = current === total - 1;

    return (

        <div
            className="
                mt-8
                sm:mt-10

                flex
                flex-col
                sm:flex-row

                items-stretch
                sm:items-center

                justify-between

                gap-4
            "
        >

            {/* Previous */}

            <button
                type="button"
                aria-label="Previous Question"
                onClick={previousQuestion}
                disabled={isFirst}
                className={`
                    w-full
                    sm:w-auto

                    rounded-xl

                    border

                    px-6
                    py-3

                    text-sm
                    sm:text-base

                    font-semibold

                    transition-all
                    duration-300

                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-400

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

                            active:translate-y-0

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
                    aria-label="Submit Quiz"
                    onClick={submitQuiz}
                    className="
                        w-full
                        sm:w-auto

                        cursor-pointer

                        rounded-xl

                        border
                        border-green-500

                        bg-green-500

                        px-8
                        py-3

                        text-sm
                        sm:text-base

                        font-semibold

                        text-white

                        shadow-md
                        shadow-green-500/20

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-green-400
                        hover:shadow-lg

                        active:translate-y-0

                        focus:outline-none
                        focus:ring-2
                        focus:ring-green-400
                    "
                >

                    ✅ Submit Quiz

                </button>

            ) : (

                <button
                    type="button"
                    aria-label="Next Question"
                    onClick={nextQuestion}
                    className="
                        w-full
                        sm:w-auto

                        cursor-pointer

                        rounded-xl

                        border
                        border-cyan-500

                        bg-cyan-500

                        px-8
                        py-3

                        text-sm
                        sm:text-base

                        font-semibold

                        text-slate-950

                        shadow-md
                        shadow-cyan-500/20

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-cyan-400
                        hover:shadow-lg

                        active:translate-y-0

                        focus:outline-none
                        focus:ring-2
                        focus:ring-cyan-400
                    "
                >

                    Next ➜

                </button>

            )}

        </div>

    );

}

export default QuizNavigation;