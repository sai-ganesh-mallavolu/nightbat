function ScoreCircle({ percentage = 0 }) {

    // Prevent invalid values
    const safePercentage = Math.min(
        100,
        Math.max(0, Number(percentage) || 0)
    );

    const radius = 90;

    const circumference =
        2 * Math.PI * radius;

    const offset =
        circumference -
        (safePercentage / 100) *
        circumference;

    return (

        <div
            className="
                relative

                mx-auto

                flex
                items-center
                justify-center

                w-[180px]
                h-[180px]

                sm:w-[220px]
                sm:h-[220px]
            "
        >

            {/* Circular Progress */}

            <svg
                width="100%"
                height="100%"
                viewBox="0 0 220 220"
                className="-rotate-90"
                role="img"
                aria-label={`Quiz accuracy ${safePercentage} percent`}
            >

                {/* Background Circle */}

                <circle
                    cx="110"
                    cy="110"
                    r={radius}
                    strokeWidth="14"
                    fill="none"
                    className="
                        stroke-slate-200

                        dark:stroke-zinc-700
                    "
                />

                {/* Progress Circle */}

                <circle
                    cx="110"
                    cy="110"
                    r={radius}
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="
                        stroke-cyan-500

                        dark:stroke-cyan-400
                    "
                    style={{
                        transition:
                            "stroke-dashoffset 1.5s ease-in-out",
                    }}
                />

            </svg>

            {/* Score Text */}

            <div
                className="
                    absolute
                    inset-0

                    flex
                    items-center
                    justify-center
                "
            >

                <div className="text-center">

                    <h2
                        className="
                            text-4xl
                            sm:text-5xl

                            font-bold

                            text-cyan-600

                            dark:text-cyan-400
                        "
                    >

                        {safePercentage}%

                    </h2>

                    <p
                        className="
                            mt-2

                            text-sm
                            sm:text-base

                            font-medium

                            text-slate-500

                            dark:text-zinc-400
                        "
                    >

                        Accuracy

                    </p>

                </div>

            </div>

        </div>

    );

}

export default ScoreCircle;