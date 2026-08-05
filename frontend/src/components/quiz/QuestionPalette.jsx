function QuestionPalette({

    total,

    current,

    answers,

    onSelect,

}) {

    return (

        <div
            className="
                mb-6
                sm:mb-8

                flex
                flex-wrap
                justify-center

                gap-2
                sm:gap-3
            "
        >

            {[...Array(total)].map((_, index) => {

                const answered =
                    answers[index] !== undefined;

                const isCurrent =
                    current === index;

                return (

                    <button
                        key={index}
                        type="button"
                        title={`Question ${index + 1}`}
                        aria-label={`Go to Question ${index + 1}`}
                        aria-current={
                            isCurrent ? "true" : undefined
                        }
                        onClick={() =>
                            onSelect(index)
                        }
                        className={`
                            flex

                            h-10
                            w-10

                            sm:h-11
                            sm:w-11

                            items-center
                            justify-center

                            rounded-full

                            border

                            text-sm
                            sm:text-base

                            font-semibold

                            transition-all
                            duration-300

                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-400

                            active:scale-95

                            ${isCurrent

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

                                        active:translate-y-0
                                    `

                                    : `
                                        border-slate-300
                                        bg-white
                                        text-slate-700

                                        shadow-sm

                                        hover:-translate-y-0.5
                                        hover:border-cyan-400
                                        hover:bg-slate-100

                                        active:translate-y-0

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