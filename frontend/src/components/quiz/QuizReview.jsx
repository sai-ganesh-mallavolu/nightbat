function QuizReview({

    questions,

    answers,

}) {

    return (

        <div className="space-y-8">

            {

                questions.map((question, index) => (

                    <div

                        key={question.id}

                        className="rounded-2xl border border-slate-700 bg-white/5 p-6"

                    >

                        <h3 className="text-lg font-semibold text-white">

                            Q{index + 1}. {question.question}

                        </h3>

                        <p className="mt-4">

                            <span className="font-semibold text-red-400">

                                Your Answer:

                            </span>{" "}

                            {answers[index] || "Not Answered"}

                        </p>

                        <p className="mt-2">

                            <span className="font-semibold text-green-400">

                                Correct Answer:

                            </span>{" "}

                            {question.correct_answer}

                        </p>

                        <div className="mt-4 rounded-xl bg-cyan-500/10 p-4">

                            <p className="text-gray-300">

                                💡 {question.explanation}

                            </p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default QuizReview;