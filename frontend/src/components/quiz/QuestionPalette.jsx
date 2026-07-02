function QuestionPalette({

    total,

    current,

    answers,

    onSelect,

}) {

    return (

        <div className="mb-8 flex flex-wrap justify-center gap-3">

            {

                [...Array(total)].map((_, index) => {

                    const answered = answers[index];

                    return (

                        <button

                            key={index}

                            onClick={() => onSelect(index)}

                            className={`h-11 w-11 rounded-full font-semibold transition

                            ${current === index

                                    ? "bg-cyan-500 text-black"

                                    : answered

                                        ? "bg-green-500 text-white"

                                        : "bg-slate-700 text-gray-300 hover:bg-slate-600"

                                }`}

                        >

                            {index + 1}

                        </button>

                    );

                })

            }

        </div>

    );

}

export default QuestionPalette;