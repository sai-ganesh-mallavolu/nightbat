function QuizCard({

    question,

    selected,

    onSelect,

}) {

    const options = [

        {
            key: "A",
            text: question.option_a,
        },

        {
            key: "B",
            text: question.option_b,
        },

        {
            key: "C",
            text: question.option_c,
        },

        {
            key: "D",
            text: question.option_d,
        },

    ];


    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-slate-50
                p-8
                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#111113]
            "
        >

            {/* Question */}

            <h2
                className="
                    mb-8
                    break-words
                    text-2xl
                    font-bold
                    leading-relaxed
                    text-slate-950

                    dark:text-white
                "
            >

                {question.question}

            </h2>


            {/* Options */}

            <div className="space-y-4">

                {options.map((option) => (

                    <button
                        type="button"
                        key={option.key}
                        onClick={() =>
                            onSelect(option.key)
                        }
                        className={`
                            w-full
                            cursor-pointer
                            rounded-xl
                            border
                            p-4
                            text-left
                            transition-all
                            duration-300

                            ${selected === option.key

                                ? `
                                        border-cyan-500
                                        bg-cyan-50
                                        text-slate-950
                                        shadow-sm
                                        shadow-cyan-500/10
                                        ring-2
                                        ring-cyan-500/10

                                        dark:border-cyan-400
                                        dark:bg-cyan-500/15
                                        dark:text-white
                                        dark:ring-cyan-400/10
                                    `

                                : `
                                        border-slate-200
                                        bg-white
                                        text-slate-700

                                        hover:-translate-y-0.5
                                        hover:border-cyan-400
                                        hover:bg-cyan-50/50

                                        dark:border-white/10
                                        dark:bg-[#18181b]
                                        dark:text-zinc-300

                                        dark:hover:border-cyan-500/50
                                        dark:hover:bg-cyan-500/5
                                    `
                            }
                        `}
                    >

                        <span
                            className={`
                                mr-2
                                font-bold

                                ${selected === option.key

                                    ? "text-cyan-600 dark:text-cyan-400"

                                    : "text-slate-900 dark:text-white"
                                }
                            `}
                        >

                            {option.key}.

                        </span>

                        <span className="break-words">
                            {option.text}
                        </span>

                    </button>

                ))}

            </div>

        </div>

    );

}

export default QuizCard;