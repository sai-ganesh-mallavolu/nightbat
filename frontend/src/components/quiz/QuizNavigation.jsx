function QuizNavigation({

    current,

    total,

    previousQuestion,

    nextQuestion,

    submitQuiz,

}) {

    return (

        <div className="mt-10 flex justify-between">

            <button

                onClick={previousQuestion}

                disabled={current === 0}

                className="rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-40"

            >

                ⬅ Previous

            </button>

            {

                current === total - 1 ? (

                    <button

                        onClick={submitQuiz}

                        className="rounded-xl bg-green-500 px-8 py-3 font-semibold text-white transition hover:bg-green-400"

                    >

                        ✅ Submit Quiz

                    </button>

                ) : (

                    <button

                        onClick={nextQuestion}

                        className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-black transition hover:bg-cyan-400"

                    >

                        Next ➜

                    </button>

                )

            }

        </div>

    );

}

export default QuizNavigation;