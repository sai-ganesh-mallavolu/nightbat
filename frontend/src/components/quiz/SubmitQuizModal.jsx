function SubmitQuizModal({

    open,

    answered,

    total,

    unansweredQuestions,

    onCancel,

    onSubmit,

    onQuestionSelect,

}) {

    if (!open) return null;


    const unanswered =
        total - answered;


    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/70
                px-6
                backdrop-blur-sm
            "
        >

            <div
                className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-2xl
                    transition-colors
                    duration-300

                    dark:border-white/10
                    dark:bg-[#18181b]
                "
            >


                {/* Title */}

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-slate-950

                        dark:text-white
                    "
                >

                    {
                        unanswered === 0

                            ? "📝 Submit Quiz?"

                            : "⚠️ Submit Quiz?"
                    }

                </h2>


                {/* Quiz Statistics */}

                <div
                    className="
                        mt-6
                        space-y-3
                        text-lg
                    "
                >

                    {/* Answered */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                    >

                        <span
                            className="
                                text-slate-600

                                dark:text-zinc-400
                            "
                        >

                            Answered

                        </span>


                        <span
                            className="
                                font-semibold
                                text-green-600

                                dark:text-green-400
                            "
                        >

                            {answered} / {total}

                        </span>

                    </div>


                    {/* Unanswered */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                    >

                        <span
                            className="
                                text-slate-600

                                dark:text-zinc-400
                            "
                        >

                            Unanswered

                        </span>


                        <span
                            className="
                                font-semibold
                                text-red-600

                                dark:text-red-400
                            "
                        >

                            {unanswered}

                        </span>

                    </div>

                </div>


                {/* Unanswered Questions */}

                {unanswered > 0 && (

                    <>

                        <p
                            className="
                                mt-6
                                text-slate-700

                                dark:text-zinc-300
                            "
                        >

                            These questions are unanswered:

                        </p>


                        <div
                            className="
                                mt-4
                                flex
                                flex-wrap
                                gap-3
                            "
                        >

                            {unansweredQuestions.map((q) => (

                                <button
                                    type="button"
                                    key={q}
                                    onClick={() =>
                                        onQuestionSelect(q)
                                    }
                                    className="
                                        cursor-pointer
                                        rounded-xl
                                        border
                                        border-red-200
                                        bg-red-50
                                        px-4
                                        py-2
                                        font-semibold
                                        text-red-600
                                        transition-all
                                        duration-300

                                        hover:-translate-y-0.5
                                        hover:border-red-500
                                        hover:bg-red-500
                                        hover:text-white

                                        dark:border-red-500/30
                                        dark:bg-red-500/10
                                        dark:text-red-300

                                        dark:hover:bg-red-500
                                        dark:hover:text-white
                                    "
                                >

                                    Q{q}

                                </button>

                            ))}

                        </div>


                        <p
                            className="
                                mt-4
                                text-sm
                                text-slate-500

                                dark:text-zinc-400
                            "
                        >

                            Click a question number to jump directly to it.

                        </p>


                        <div
                            className="
                                mt-6
                                rounded-xl
                                border
                                border-amber-200
                                bg-amber-50
                                px-4
                                py-3
                                text-amber-700

                                dark:border-amber-500/20
                                dark:bg-amber-500/10
                                dark:text-amber-300
                            "
                        >

                            ⚠️ Unanswered questions will be marked incorrect.

                        </div>

                    </>

                )}


                {/* All Questions Answered */}

                {unanswered === 0 && (

                    <div
                        className="
                            mt-6
                            rounded-xl
                            border
                            border-green-200
                            bg-green-50
                            px-4
                            py-3
                            text-green-700

                            dark:border-green-500/20
                            dark:bg-green-500/10
                            dark:text-green-300
                        "
                    >

                        ✅ Great! You answered every question.

                    </div>

                )}


                {/* Action Buttons */}

                <div
                    className="
                        mt-8
                        flex
                        flex-wrap
                        justify-end
                        gap-4
                    "
                >

                    {/* Cancel */}

                    <button
                        type="button"
                        onClick={onCancel}
                        className="
                            cursor-pointer
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            px-6
                            py-3
                            font-semibold
                            text-slate-700
                            shadow-sm
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-slate-100

                            dark:border-white/10
                            dark:bg-zinc-700
                            dark:text-white

                            dark:hover:bg-zinc-600
                        "
                    >

                        Cancel

                    </button>


                    {/* Submit */}

                    <button
                        type="button"
                        onClick={onSubmit}
                        className="
                            cursor-pointer
                            rounded-xl
                            bg-cyan-500
                            px-6
                            py-3
                            font-semibold
                            text-slate-950
                            shadow-md
                            shadow-cyan-500/20
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-cyan-400
                            hover:shadow-lg
                        "
                    >

                        ✅ Submit Quiz

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SubmitQuizModal;