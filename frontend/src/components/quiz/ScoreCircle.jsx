function ScoreCircle({ percentage }) {

    const radius = 90;

    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (percentage / 100) * circumference;

    return (

        <div className="flex justify-center">

            <svg
                width="220"
                height="220"
                className="-rotate-90"
            >

                <circle
                    cx="110"
                    cy="110"
                    r={radius}
                    stroke="#1e293b"
                    strokeWidth="14"
                    fill="none"
                />

                <circle
                    cx="110"
                    cy="110"
                    r={radius}
                    stroke="#06b6d4"
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                        transition: "stroke-dashoffset 1.5s ease",
                    }}
                />

            </svg>

            <div className="absolute flex h-[220px] w-[220px] items-center justify-center">

                <div className="text-center">

                    <h2 className="text-5xl font-bold text-cyan-400">

                        {percentage}%

                    </h2>

                    <p className="mt-2 text-gray-400">

                        Accuracy

                    </p>

                </div>

            </div>

        </div>

    );

}

export default ScoreCircle;