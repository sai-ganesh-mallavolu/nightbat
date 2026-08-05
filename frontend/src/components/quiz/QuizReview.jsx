function QuizReview({

    questions,

    answers,

}) {

    return (

        <div className="space-y-6 sm:space-y-8">

            {questions.map((question, index) => {

                const userAnswer = answers[index];

                const isAnswered =
                    userAnswer !== undefined;

                const isCorrect =
                    userAnswer ===
                    question.correct_answer;

                return (

                    <div
                        key={question.id ?? index}
                        className={`
                            rounded-2xl

                            border

                            p-5
                            sm:p-6

                            shadow-sm

                            transition-all
                            duration-300

                            ${isCorrect

                                ? `
                                    border-green-200

                                    hover:border-green-400

                                    dark:border-green-500/20
                                    dark:hover:border-green-500/40
                                `

                                : isAnswered

                                    ? `
                                        border-red-200

                                        hover:border-red-400

                                        dark:border-red-500/20
                                        dark:hover:border-red-500/40
                                    `

                                    : `
                                        border-slate-200

                                        hover:border-cyan-300

                                        dark:border-white/10
                                        dark:hover:border-cyan-500/30
                                    `
                            }

                            bg-white

                            dark:bg-[#18181b]
                            dark:shadow-none
                        `}
                    >

                        {/* Question */}

                        <h3
                            className="
                                text-base
                                sm:text-lg

                                font-semibold

                                leading-7
                                sm:leading-8

                                text-slate-950

                                dark:text-white
                            "
                        >

                            Q{index + 1}. {question.question}

                        </h3>

                        {/* Status */}

                        <div className="mt-4">

                            {isCorrect ? (

                                <span
                                    className="
                                        inline-flex

                                        rounded-full

                                        bg-green-100

                                        px-3
                                        py-1

                                        text-xs
                                        sm:text-sm

                                        font-semibold

                                        text-green-700

                                        dark:bg-green-500/10
                                        dark:text-green-300
                                    "
                                >

                                    ✅ Correct

                                </span>

                            ) : isAnswered ? (

                                <span
                                    className="
                                        inline-flex

                                        rounded-full

                                        bg-red-100

                                        px-3
                                        py-1

                                        text-xs
                                        sm:text-sm

                                        font-semibold

                                        text-red-700

                                        dark:bg-red-500/10
                                        dark:text-red-300
                                    "
                                >

                                    ❌ Incorrect

                                </span>

                            ) : (

                                <span
                                    className="
                                        inline-flex

                                        rounded-full

                                        bg-amber-100

                                        px-3
                                        py-1

                                        text-xs
                                        sm:text-sm

                                        font-semibold

                                        text-amber-700

                                        dark:bg-amber-500/10
                                        dark:text-amber-300
                                    "
                                >

                                    ⚠️ Not Answered

                                </span>

                            )}

                        </div>

                        {/* User Answer */}

                        <p
                            className="
                                mt-5

                                text-sm
                                sm:text-base

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

                            {userAnswer ?? "Not Answered"}

                        </p>

                        {/* Correct Answer */}

                        <p
                            className="
                                mt-2

                                text-sm
                                sm:text-base

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

                            <h4
                                className="
                                    mb-2

                                    font-semibold

                                    text-cyan-700

                                    dark:text-cyan-300
                                "
                            >

                                💡 Explanation

                            </h4>

                            <p
                                className="
                                    text-sm
                                    sm:text-base

                                    leading-7

                                    text-slate-700

                                    dark:text-zinc-300
                                "
                            >

                                {question.explanation}

                            </p>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}

export default QuizReview;