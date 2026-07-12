function FlashcardProgress({

    current,

    total,

    learned,

}) {

    const percentage =
        total === 0
            ? 0
            : Math.round(
                ((current + 1) / total) * 100
            );


    return (

        <div className="mb-8">


            {/* Progress Header */}

            <div className="mb-3 flex justify-between">

                <span
                    className="
                        font-semibold
                        text-cyan-700

                        dark:text-cyan-300
                    "
                >
                    Progress
                </span>


                <span
                    className="
                        text-slate-500

                        dark:text-zinc-400
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
            >

                <div
                    className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-400
                        to-violet-500
                        transition-all
                        duration-700
                    "
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>


            {/* Learning Statistics */}

            <div
                className="
                    mt-5
                    flex
                    flex-wrap
                    justify-between
                    gap-3
                    text-sm
                "
            >

                <span
                    className="
                        font-medium
                        text-green-600

                        dark:text-green-400
                    "
                >
                    ✅ Learned: {learned}
                </span>


                <span
                    className="
                        text-slate-500

                        dark:text-zinc-400
                    "
                >
                    📚 Remaining: {total - learned}
                </span>

            </div>

        </div>

    );

}

export default FlashcardProgress;