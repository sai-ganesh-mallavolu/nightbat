function QuizProgress({

    current,

    total,

}) {

    const percentage =
        total === 0
            ? 0
            : ((current + 1) / total) * 100;


    return (

        <div className="mb-8">


            {/* Progress Information */}

            <div
                className="
                    mb-2
                    flex
                    justify-between
                    text-sm
                "
            >

                <span
                    className="
                        font-medium
                        text-slate-600

                        dark:text-zinc-400
                    "
                >

                    Question {current + 1}

                </span>


                <span
                    className="
                        text-slate-500

                        dark:text-zinc-400
                    "
                >

                    {total}

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