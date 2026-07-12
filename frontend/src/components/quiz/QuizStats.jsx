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
                p-6
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
                    text-slate-500

                    dark:text-zinc-400
                "
            >

                {title}

            </h3>


            {/* Value */}

            <p
                className={`
                    mt-2
                    text-3xl
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

    const minutes =
        Math.floor(
            result.timeTaken / 60
        );


    const seconds =
        result.timeTaken % 60;


    return (

        <div
            className="
                mt-10
                grid
                gap-5

                sm:grid-cols-2
                lg:grid-cols-5
            "
        >

            <Card
                title="Correct"
                value={result.correct}
                color="
                    text-green-600
                    dark:text-green-400
                "
            />


            <Card
                title="Wrong"
                value={result.wrong}
                color="
                    text-red-600
                    dark:text-red-400
                "
            />


            <Card
                title="Skipped"
                value={result.unanswered}
                color="
                    text-yellow-600
                    dark:text-yellow-400
                "
            />


            <Card
                title="Accuracy"
                value={`${result.percentage}%`}
                color="
                    text-cyan-600
                    dark:text-cyan-400
                "
            />


            <Card
                title="Time"
                value={
                    `${minutes}:${String(seconds).padStart(2, "0")}`
                }
                color="
                    text-violet-600
                    dark:text-violet-400
                "
            />

        </div>

    );

}

export default QuizStats;