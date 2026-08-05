import { useEffect } from "react";

function SubmitQuizModal({

    open,

    answered,

    total,

    unansweredQuestions,

    onCancel,

    onSubmit,

    onQuestionSelect,

}) {

    // ==========================
    // Close on ESC
    // ==========================

    useEffect(() => {

        if (!open) return;

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {

                onCancel?.();

            }

        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [open, onCancel]);

    // ==========================
    // Prevent Background Scroll
    // ==========================

    useEffect(() => {

        if (!open) return;

        document.body.style.overflow = "hidden";

        return () => {

            document.body.style.overflow = "";

        };

    }, [open]);

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

                px-4
                sm:px-6

                backdrop-blur-sm

                animate-in
                fade-in
                duration-200
            "
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-quiz-title"
        >

            <div
                className="
                    w-full
                    max-w-lg

                    max-h-[90vh]
                    overflow-y-auto

                    rounded-3xl

                    border
                    border-slate-200

                    bg-white

                    p-5
                    sm:p-8

                    shadow-2xl

                    transition-colors
                    duration-300

                    dark:border-white/10
                    dark:bg-[#18181b]
                "
            >

                {/* ==========================
                    Title
                ========================== */}

                <h2
                    id="submit-quiz-title"
                    className="
                        text-2xl
                        sm:text-3xl

                        font-bold

                        text-slate-950

                        dark:text-white
                    "
                >

                    {unanswered === 0
                        ? "📝 Submit Quiz?"
                        : "⚠️ Submit Quiz?"
                    }

                </h2>

                <p
                    className="
                        mt-2

                        text-sm
                        sm:text-base

                        text-slate-500

                        dark:text-zinc-400
                    "
                >

                    Review your quiz summary before submitting.

                </p>

                {/* ==========================
                    Quiz Statistics
                ========================== */}

                <div
                    className="
                        mt-6

                        space-y-3

                        rounded-2xl

                        border
                        border-slate-200

                        bg-slate-50

                        p-4

                        dark:border-white/10
                        dark:bg-zinc-900
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
                                text-sm
                                sm:text-base

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
                                text-sm
                                sm:text-base

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

                {/* ==========================
                    Unanswered Questions
                ========================== */}

                {unanswered > 0 && (

                    <>

                        <p
                            className="
                                mt-6

                                text-sm
                                sm:text-base

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

                                gap-2
                                sm:gap-3
                            "
                        >

                            {unansweredQuestions.map((q) => (

                                <button
                                    key={q}
                                    type="button"
                                    title={`Go to Question ${q}`}
                                    aria-label={`Go to Question ${q}`}
                                    onClick={() =>
                                        onQuestionSelect(q)
                                    }
                                    className="
                                        rounded-xl

                                        border
                                        border-red-200

                                        bg-red-50

                                        px-4
                                        py-2

                                        text-sm
                                        sm:text-base

                                        font-semibold

                                        text-red-600

                                        transition-all
                                        duration-300

                                        hover:-translate-y-0.5
                                        hover:border-red-500
                                        hover:bg-red-500
                                        hover:text-white

                                        active:translate-y-0

                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-red-400

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

                            Click any question number to jump directly to it.

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

                                text-sm
                                sm:text-base

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

                {/* ==========================
                    All Questions Answered
                ========================== */}

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

                            text-sm
                            sm:text-base

                            text-green-700

                            dark:border-green-500/20
                            dark:bg-green-500/10
                            dark:text-green-300
                        "
                    >

                        ✅ Great! You answered every question.

                    </div>

                )}

                {/* ==========================
                    Action Buttons
                ========================== */}

                <div
                    className="
                        mt-8

                        flex
                        flex-col-reverse
                        sm:flex-row

                        justify-end

                        gap-3
                        sm:gap-4
                    "
                >
                    {/* Cancel */}

                    <button
                        type="button"
                        onClick={onCancel}
                        aria-label="Cancel Quiz Submission"
                        className="
                            w-full
                            sm:w-auto

                            cursor-pointer

                            rounded-xl

                            border
                            border-slate-300

                            bg-white

                            px-6
                            py-3

                            text-sm
                            sm:text-base

                            font-semibold

                            text-slate-700

                            shadow-sm

                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-slate-100

                            active:translate-y-0

                            focus:outline-none
                            focus:ring-2
                            focus:ring-slate-400

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
                        aria-label="Submit Quiz"
                        className="
                            w-full
                            sm:w-auto

                            cursor-pointer

                            rounded-xl

                            bg-cyan-500

                            px-6
                            py-3

                            text-sm
                            sm:text-base

                            font-semibold

                            text-slate-950

                            shadow-md
                            shadow-cyan-500/20

                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-cyan-400
                            hover:shadow-lg

                            active:translate-y-0

                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-400
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