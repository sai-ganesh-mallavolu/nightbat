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

    const unanswered = total - answered;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-3xl border border-cyan-500/20 bg-slate-900 p-8 shadow-2xl">

                <h2 className="text-3xl font-bold text-white">

                    {unanswered === 0
                        ? "📝 Submit Quiz?"
                        : "⚠️ Submit Quiz?"}

                </h2>

                <div className="mt-6 space-y-3 text-lg">

                    <div className="flex justify-between">

                        <span className="text-gray-400">

                            Answered

                        </span>

                        <span className="font-semibold text-green-400">

                            {answered} / {total}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-400">

                            Unanswered

                        </span>

                        <span className="font-semibold text-red-400">

                            {unanswered}

                        </span>

                    </div>

                </div>

                {unanswered > 0 && (

                    <>

                        <p className="mt-6 text-gray-300">

                            These questions are unanswered:

                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">

                            {unansweredQuestions.map((q) => (

                                <button
                                    key={q}
                                    onClick={() => onQuestionSelect(q)}
                                    className="rounded-xl border border-red-500/30 bg-red-500/15 px-4 py-2 font-semibold text-red-300 transition duration-300 hover:scale-105 hover:bg-red-500 hover:text-white"
                                >

                                    Q{q}

                                </button>

                            ))}

                        </div>

                        <p className="mt-4 text-sm text-gray-400">

                            Click a question number to jump directly to it.

                        </p>

                        <p className="mt-6 text-yellow-300">

                            Unanswered questions will be marked incorrect.

                        </p>

                    </>

                )}

                {unanswered === 0 && (

                    <p className="mt-6 text-green-300">

                        Great! You answered every question.

                    </p>

                )}

                <div className="mt-8 flex justify-end gap-4">

                    <button
                        onClick={onCancel}
                        className="rounded-xl bg-slate-700 px-6 py-3 text-white transition hover:bg-slate-600"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onSubmit}
                        className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
                    >
                        ✅ Submit Quiz
                    </button>

                </div>

            </div>

        </div>

    );

}

export default SubmitQuizModal;