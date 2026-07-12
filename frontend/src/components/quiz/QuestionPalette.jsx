function QuestionPalette({

    total,

    current,

    answers,

    onSelect,

}) {

    return (

        <div
            className="
                mb-8
                flex
                flex-wrap
                justify-center
                gap-3
            "
        >

            {[...Array(total)].map((_, index) => {

                const answered =
                    answers[index] !== undefined;

                return (

                    <button
                        type="button"
                        key={index}
                        onClick={() =>
                            onSelect(index)
                        }
                        className={`
                            flex
                            h-11
                            w-11
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-full
                            border
                            font-semibold
                            transition-all
                            duration-300

                            ${current === index

                                ? `
                                        border-cyan-500
                                        bg-cyan-500
                                        text-slate-950
                                        shadow-md
                                        shadow-cyan-500/20
                                        ring-2
                                        ring-cyan-500/20
                                    `

                                : answered

                                    ? `
                                            border-green-500
                                            bg-green-500
                                            text-white
                                            shadow-sm
                                            shadow-green-500/20

                                            hover:-translate-y-0.5
                                            hover:bg-green-400
                                        `

                                    : `
                                            border-slate-300
                                            bg-white
                                            text-slate-700
                                            shadow-sm

                                            hover:-translate-y-0.5
                                            hover:border-cyan-400
                                            hover:bg-slate-100

                                            dark:border-white/10
                                            dark:bg-zinc-700
                                            dark:text-zinc-300
                                            dark:shadow-none

                                            dark:hover:border-cyan-500/50
                                            dark:hover:bg-zinc-600
                                        `
                            }
                        `}
                    >

                        {index + 1}

                    </button>

                );

            })}

        </div>

    );

}

export default QuestionPalette;