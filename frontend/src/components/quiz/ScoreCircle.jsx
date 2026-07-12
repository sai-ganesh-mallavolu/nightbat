function ScoreCircle({ percentage }) {

    const radius = 90;

    const circumference =
        2 * Math.PI * radius;

    const offset =
        circumference -
        (percentage / 100) *
        circumference;


    return (

        <div className="relative flex justify-center">

            {/* Circular Progress */}

            <svg
                width="220"
                height="220"
                className="-rotate-90"
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
                    strokeDasharray={
                        circumference
                    }
                    strokeDashoffset={
                        offset
                    }
                    className="
                        stroke-cyan-500

                        dark:stroke-cyan-400
                    "
                    style={{
                        transition:
                            "stroke-dashoffset 1.5s ease",
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
                            text-5xl
                            font-bold
                            text-cyan-600

                            dark:text-cyan-400
                        "
                    >

                        {percentage}%

                    </h2>


                    <p
                        className="
                            mt-2
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