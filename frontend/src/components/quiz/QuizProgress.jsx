function QuizProgress({

    current,

    total,

}) {

    const percentage =

        ((current + 1) / total) * 100;

    return (

        <div className="mb-8">

            <div className="mb-2 flex justify-between text-sm text-gray-400">

                <span>

                    Question {current + 1}

                </span>

                <span>

                    {total}

                </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-700">

                <div

                    className="h-full rounded-full bg-cyan-400 transition-all duration-500"

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

        </div>

    );

}

export default QuizProgress;