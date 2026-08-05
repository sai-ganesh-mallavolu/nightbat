function Card({

    title,

    value,

    color,

}) {

    return (

        <div
            className="
                rounded-2xl

                border
                border-slate-200

                bg-slate-50

                p-5
                sm:p-6

                text-center

                shadow-sm

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:shadow-md

                dark:border-white/10
                dark:bg-[#111113]
                dark:shadow-none
            "
        >

            {/* Title */}

            <h3
                className="
                    text-sm
                    sm:text-base

                    font-medium

                    text-slate-500

                    dark:text-zinc-400
                "
            >

                {title}

            </h3>

            {/* Value */}

            <p
                className={`
                    mt-3

                    break-words

                    text-2xl
                    sm:text-3xl

                    font-bold

                    ${color}
                `}
            >

                {value}

            </p>

        </div>

    );

}

function QuizStats({ result }) {

    const safeResult = {

        correct: result?.correct ?? 0,

        wrong: result?.wrong ?? 0,

        unanswered: result?.unanswered ?? 0,

        percentage: Math.min(
            100,
            Math.max(0, Number(result?.percentage) || 0)
        ),

        timeTaken: Math.max(
            0,
            Number(result?.timeTaken) || 0
        ),

    };

    const minutes =
        Math.floor(
            safeResult.timeTaken / 60
        );

    const seconds =
        safeResult.timeTaken % 60;

    return (

        <section
            aria-label="Quiz Statistics"
            className="
                mt-10

                grid

                gap-5

                grid-cols-1

                sm:grid-cols-2

                lg:grid-cols-5
            "
        >

            <Card
                title="Correct"
                value={safeResult.correct}
                color="
                    text-green-600
                    dark:text-green-400
                "
            />

            <Card
                title="Wrong"
                value={safeResult.wrong}
                color="
                    text-red-600
                    dark:text-red-400
                "
            />

            <Card
                title="Skipped"
                value={safeResult.unanswered}
                color="
                    text-yellow-600
                    dark:text-yellow-400
                "
            />

            <Card
                title="Accuracy"
                value={`${safeResult.percentage}%`}
                color="
                    text-cyan-600
                    dark:text-cyan-400
                "
            />

            <Card
                title="Time"
                value={`${minutes}:${String(seconds).padStart(2, "0")}`}
                color="
                    text-violet-600
                    dark:text-violet-400
                "
            />

        </section>

    );

}

export default QuizStats;