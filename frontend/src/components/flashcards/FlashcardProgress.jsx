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

            <div className="mb-3 flex justify-between">

                <span className="font-semibold text-cyan-300">

                    Progress

                </span>

                <span className="text-gray-400">

                    {percentage}%

                </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-700">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-700"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

            <div className="mt-5 flex justify-between text-sm">

                <span className="text-green-400">

                    ✅ Learned: {learned}

                </span>

                <span className="text-gray-400">

                    📚 Remaining: {total - learned}

                </span>

            </div>

        </div>

    );

}

export default FlashcardProgress;