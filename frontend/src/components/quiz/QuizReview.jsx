function QuizReview({

    questions,

    answers,

}) {

    return (

        <div className="space-y-8">

            {questions.map((question, index) => (

                <div
                    key={question.id}
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                        transition-all
                        duration-300

                        hover:border-cyan-300
                        hover:shadow-md

                        dark:border-white/10
                        dark:bg-[#18181b]
                        dark:shadow-none
                        dark:hover:border-cyan-500/30
                    "
                >

                    {/* Question */}

                    <h3
                        className="
                            text-lg
                            font-semibold
                            leading-8
                            text-slate-950

                            dark:text-white
                        "
                    >

                        Q{index + 1}.{" "}
                        {question.question}

                    </h3>


                    {/* User Answer */}

                    <p
                        className="
                            mt-4
                            text-slate-700

                            dark:text-zinc-300
                        "
                    >

                        <span
                            className="
                                font-semibold
                                text-red-600

                                dark:text-red-400
                            "
                        >

                            Your Answer:

                        </span>{" "}

                        {answers[index] || "Not Answered"}

                    </p>


                    {/* Correct Answer */}

                    <p
                        className="
                            mt-2
                            text-slate-700

                            dark:text-zinc-300
                        "
                    >

                        <span
                            className="
                                font-semibold
                                text-green-600

                                dark:text-green-400
                            "
                        >

                            Correct Answer:

                        </span>{" "}

                        {question.correct_answer}

                    </p>


                    {/* Explanation */}

                    <div
                        className="
                            mt-5
                            rounded-xl
                            border
                            border-cyan-200
                            bg-cyan-50
                            p-4

                            dark:border-cyan-500/20
                            dark:bg-cyan-500/10
                        "
                    >

                        <p
                            className="
                                leading-7
                                text-slate-700

                                dark:text-zinc-300
                            "
                        >

                            💡 {question.explanation}

                        </p>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default QuizReview;