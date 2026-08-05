function QuizProgress({

    current,

    total,

}) {

    const percentage =
        total === 0
            ? 0
            : Math.round(((current + 1) / total) * 100);

    return (

        <div className="mb-6 sm:mb-8">

            {/* Progress Info */}

            <div
                className="
                    mb-3

                    flex
                    items-center
                    justify-between

                    text-sm
                    sm:text-base
                "
            >

                <span
                    className="
                        font-semibold
                        text-slate-700

                        dark:text-zinc-300
                    "
                >

                    Question {current + 1} of {total}

                </span>

                <span
                    className="
                        rounded-full

                        bg-slate-100

                        px-3
                        py-1

                        text-xs
                        sm:text-sm

                        font-medium

                        text-slate-600

                        dark:bg-zinc-800
                        dark:text-zinc-300
                    "
                >

                    {percentage}%

                </span>

            </div>

            {/* Progress Bar */}

            <div
                className="
                    h-3

                    overflow-hidden

                    rounded-full

                    bg-slate-200

                    dark:bg-zinc-700
                "
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentage}
                aria-label="Quiz Progress"
            >

                <div
                    className="
                        h-full

                        rounded-full

                        bg-gradient-to-r
                        from-cyan-400
                        to-cyan-500

                        transition-all
                        duration-500
                        ease-out
                    "
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

        </div>

    );

}

export default QuizProgress;