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

        <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">

            <h2 className="mb-8 text-2xl font-bold text-white">

                {question.question}

            </h2>

            <div className="space-y-4">

                {

                    options.map((option) => (

                        <button

                            key={option.key}

                            onClick={() =>

                                onSelect(option.key)

                            }

                            className={`w-full rounded-xl border p-4 text-left transition

                            ${selected === option.key

                                    ? "border-cyan-400 bg-cyan-500/20"

                                    : "border-slate-700 hover:border-cyan-500"

                                }`}

                        >

                            <span className="font-bold">

                                {option.key}.

                            </span>{" "}

                            {option.text}

                        </button>

                    ))

                }

            </div>

        </div>

    );

}

export default QuizCard;