function Card({ title, value, color }) {

    return (

        <div className="rounded-2xl bg-slate-800 p-6 text-center">

            <h3 className="text-gray-400">

                {title}

            </h3>

            <p className={`mt-2 text-3xl font-bold ${color}`}>

                {value}

            </p>

        </div>

    );

}

function QuizStats({ result }) {

    const minutes = Math.floor(result.timeTaken / 60);

    const seconds = result.timeTaken % 60;

    return (

        <div className="mt-10 grid gap-5 md:grid-cols-5">

            <Card

                title="Correct"

                value={result.correct}

                color="text-green-400"

            />

            <Card

                title="Wrong"

                value={result.wrong}

                color="text-red-400"

            />

            <Card

                title="Skipped"

                value={result.unanswered}

                color="text-yellow-400"

            />

            <Card

                title="Accuracy"

                value={`${result.percentage}%`}

                color="text-cyan-400"

            />

            <Card

                title="Time"

                value={`${minutes}:${String(seconds).padStart(2, "0")}`}

                color="text-violet-400"

            />

        </div>

    );

}

export default QuizStats;