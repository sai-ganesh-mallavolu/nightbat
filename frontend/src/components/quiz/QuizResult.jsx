import { useEffect, useMemo, useRef, useState } from "react";

import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

import ScoreCircle from "./ScoreCircle";
import BadgeCard from "./BadgeCard";
import QuizStats from "./QuizStats";

import { downloadQuizReport } from "../../pdf/downloadQuizReport";

function QuizResult({

    questions,

    answers,

    result,

    onRetake,

}) {

    const { width, height } =
        useWindowSize();

    const [animatedPercentage, setAnimatedPercentage] =
        useState(0);
    const analysisRef = useRef(null);

    // ==========================
    // Score Animation
    // ==========================

    useEffect(() => {

        let value = 0;

        const interval = setInterval(() => {

            value++;

            setAnimatedPercentage(value);

            if (value >= result.percentage) {

                clearInterval(interval);

            }

        }, 15);

        return () =>
            clearInterval(interval);

    }, [result.percentage]);

    useEffect(() => {
        analysisRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    // ==========================
    // Performance Message
    // ==========================

    const performanceMessage = useMemo(() => {

        if (result.percentage >= 90) {

            return {
                title: "Outstanding Performance! 🎉",
                feedback:
                    "Outstanding! You have mastered this document exceptionally well. Keep maintaining this level of performance.",
            };

        }

        if (result.percentage >= 75) {

            return {
                title: "Excellent Work! 👏",
                feedback:
                    "Excellent understanding! Review only the questions you missed to achieve perfection.",
            };

        }

        if (result.percentage >= 60) {

            return {
                title: "Good Job! 👍",
                feedback:
                    "Good attempt. Spend a little more time reviewing the explanations for incorrect answers.",
            };

        }

        return {

            title: "Keep Practicing 💪",

            feedback:
                "You should revise this document once more and attempt the quiz again. Practice will improve your score.",

        };

    }, [result.percentage]);

    // ==========================
    // Download Report
    // ==========================

    const handleDownload = () => {

        downloadQuizReport({

            documentName:
                "NightBat AI Quiz",

            questions,

            answers,

            result,

        });

    };
    return (

        <div
            ref={analysisRef}
            className="
                mt-8
                sm:mt-10
                lg:mt-12

                rounded-3xl

                border
                border-slate-200

                bg-white

                p-5
                sm:p-8
                lg:p-10

                shadow-2xl
                shadow-slate-200/50

                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none
            "
        >

            {/* ==========================
                Confetti
            ========================== */}

            {result.percentage >= 90 && (

                <Confetti
                    width={width ?? window.innerWidth}
                    height={height ?? window.innerHeight}
                    recycle={false}
                    numberOfPieces={350}
                />

            )}

            {/* ==========================
                Heading
            ========================== */}

            <div className="text-center">

                <h1
                    className="
                        text-3xl
                        sm:text-4xl
                        lg:text-5xl

                        font-bold

                        text-slate-950

                        dark:text-white
                    "
                >

                    🎉 Quiz Completed

                </h1>

                <p
                    className="
                        mt-4

                        text-lg
                        sm:text-xl

                        text-slate-600

                        dark:text-zinc-400
                    "
                >

                    {performanceMessage.title}

                </p>

            </div>

            {/* ==========================
                Score Banner
            ========================== */}

            <div
                className="
                    mt-8
                    sm:mt-10

                    rounded-3xl

                    border
                    border-cyan-200

                    bg-cyan-50

                    p-6
                    sm:p-8

                    text-center

                    dark:border-cyan-500/20
                    dark:bg-cyan-500/10
                "
            >

                <h2
                    className="
                        text-4xl
                        sm:text-5xl

                        font-bold

                        text-cyan-600

                        dark:text-cyan-300
                    "
                >

                    {result.correct} / {questions.length}

                </h2>

                <p
                    className="
                        mt-3

                        text-sm
                        sm:text-base

                        text-slate-600

                        dark:text-zinc-300
                    "
                >

                    Questions Answered Correctly

                </p>

            </div>

            {/* ==========================
                Score Circle
            ========================== */}

            <div
                className="
                    relative

                    mt-10
                    sm:mt-12

                    flex
                    justify-center
                "
            >

                <ScoreCircle
                    percentage={animatedPercentage}
                />

            </div>

            {/* ==========================
                Badge
            ========================== */}

            <div className="mt-8 sm:mt-10">

                <BadgeCard
                    percentage={result.percentage}
                />

            </div>
            {/* ==========================
                AI Feedback
            ========================== */}

            <div
                className="
                    mt-8
                    sm:mt-10

                    rounded-3xl

                    border
                    border-cyan-200

                    bg-cyan-50

                    p-5
                    sm:p-8

                    transition-colors
                    duration-300

                    dark:border-cyan-500/20
                    dark:bg-cyan-500/10
                "
            >

                <h2
                    className="
                        text-xl
                        sm:text-2xl

                        font-bold

                        text-cyan-700

                        dark:text-cyan-300
                    "
                >

                    🤖 NightBat AI Feedback

                </h2>

                <p
                    className="
                        mt-4

                        text-sm
                        sm:text-base

                        leading-7
                        sm:leading-8

                        text-slate-700

                        dark:text-zinc-300
                    "
                >

                    {performanceMessage.feedback}

                </p>

            </div>

            {/* ==========================
                Statistics
            ========================== */}

            <div className="mt-8 sm:mt-10">

                <QuizStats
                    result={result}
                />

            </div>

            {/* ==========================
                Review Heading
            ========================== */}

            <div className="mt-12 sm:mt-16">

                <h2
                    className="
                        text-2xl
                        sm:text-3xl

                        font-bold

                        text-slate-950

                        dark:text-white
                    "
                >

                    📖 Review Answers

                </h2>

                <p
                    className="
                        mt-2

                        text-sm
                        sm:text-base

                        leading-7

                        text-slate-600

                        dark:text-zinc-400
                    "
                >

                    Review every question, compare your answer with the
                    correct answer, and learn from the explanation provided.

                </p>

            </div>

            {/* ==========================
                Review Cards
            ========================== */}

            <div
                className="
                    mt-8
                    sm:mt-10

                    space-y-6
                    sm:space-y-8
                "
            >

                {questions.map((question, index) => {

                    const userAnswer =
                        answers[index];

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
                                sm:p-8

                                transition-all
                                duration-300

                                ${isCorrect

                                    ? `
                                        border-green-200

                                        bg-gradient-to-r
                                        from-green-50
                                        to-white

                                        dark:border-green-500/20
                                        dark:from-green-500/10
                                        dark:to-transparent
                                    `

                                    : isAnswered

                                        ? `
                                            border-red-200

                                            bg-gradient-to-r
                                            from-red-50
                                            to-white

                                            dark:border-red-500/20
                                            dark:from-red-500/10
                                            dark:to-transparent
                                        `

                                        : `
                                            border-amber-200

                                            bg-gradient-to-r
                                            from-amber-50
                                            to-white

                                            dark:border-amber-500/20
                                            dark:from-amber-500/10
                                            dark:to-transparent
                                        `
                                }
                            `}
                        >

                            {/* Status */}

                            <div
                                className="
                                    mb-5

                                    flex
                                    flex-wrap

                                    items-center

                                    justify-between

                                    gap-3
                                "
                            >

                                <h3
                                    className="
                                        text-lg
                                        sm:text-xl

                                        font-bold

                                        text-slate-950

                                        dark:text-white
                                    "
                                >

                                    Question {index + 1}

                                </h3>

                                {isCorrect ? (

                                    <span
                                        className="
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

                            {/* Question */}

                            <p
                                className="
                                    break-words

                                    text-base
                                    sm:text-lg

                                    leading-7
                                    sm:leading-8

                                    text-slate-700

                                    dark:text-zinc-200
                                "
                            >

                                {question.question}

                            </p>

                            {/* Answer Comparison */}

                            <div
                                className="
                                    mt-8

                                    grid

                                    gap-4

                                    md:grid-cols-2
                                "
                            >
                                {/* Your Answer */}

                                <div
                                    className="
                                        rounded-xl

                                        border
                                        border-slate-200

                                        bg-white

                                        p-5

                                        dark:border-white/10
                                        dark:bg-black/20
                                    "
                                >

                                    <p
                                        className="
                                            text-sm

                                            font-semibold

                                            text-slate-500

                                            dark:text-zinc-400
                                        "
                                    >

                                        Your Answer

                                    </p>

                                    <p
                                        className={`
                                            mt-3

                                            break-words

                                            text-xl
                                            sm:text-2xl

                                            font-bold

                                            ${isCorrect

                                                ? "text-green-600 dark:text-green-400"

                                                : isAnswered

                                                    ? "text-red-600 dark:text-red-400"

                                                    : "text-amber-600 dark:text-amber-400"
                                            }
                                        `}
                                    >

                                        {isAnswered
                                            ? `Option ${userAnswer}`
                                            : "Not Answered"}

                                    </p>

                                </div>

                                {/* Correct Answer */}

                                <div
                                    className="
                                        rounded-xl

                                        border
                                        border-slate-200

                                        bg-white

                                        p-5

                                        dark:border-white/10
                                        dark:bg-black/20
                                    "
                                >

                                    <p
                                        className="
                                            text-sm

                                            font-semibold

                                            text-slate-500

                                            dark:text-zinc-400
                                        "
                                    >

                                        Correct Answer

                                    </p>

                                    <p
                                        className="
                                            mt-3

                                            break-words

                                            text-xl
                                            sm:text-2xl

                                            font-bold

                                            text-green-600

                                            dark:text-green-400
                                        "
                                    >

                                        Option {question.correct_answer}

                                    </p>

                                </div>

                            </div>

                            {/* Explanation */}

                            <div
                                className="
                                    mt-8

                                    rounded-2xl

                                    border
                                    border-slate-200

                                    bg-slate-50

                                    p-5
                                    sm:p-6

                                    dark:border-white/10
                                    dark:bg-[#111113]
                                "
                            >

                                <h4
                                    className="
                                        text-base
                                        sm:text-lg

                                        font-bold

                                        text-cyan-700

                                        dark:text-cyan-300
                                    "
                                >

                                    💡 Explanation

                                </h4>

                                <p
                                    className="
                                        mt-4

                                        break-words

                                        text-sm
                                        sm:text-base

                                        leading-7
                                        sm:leading-8

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
            {/* ==========================
                Bottom Buttons
            ========================== */}

            <div
                className="
                    mt-12
                    sm:mt-16

                    flex
                    flex-col
                    sm:flex-row

                    items-stretch
                    sm:items-center

                    justify-center

                    gap-4
                    sm:gap-5
                "
            >

                {/* Retake Quiz */}

                <button
                    type="button"
                    aria-label="Retake Quiz"
                    onClick={onRetake}
                    className="
                        w-full
                        sm:w-auto

                        cursor-pointer

                        rounded-xl

                        bg-cyan-500

                        px-8
                        py-4

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

                    🔄 Retake Quiz

                </button>

                {/* Download Report */}

                <button
                    type="button"
                    aria-label="Download Quiz Report"
                    onClick={handleDownload}
                    className="
                        w-full
                        sm:w-auto

                        cursor-pointer

                        rounded-xl

                        bg-violet-600

                        px-8
                        py-4

                        text-sm
                        sm:text-base

                        font-semibold

                        text-white

                        shadow-md
                        shadow-violet-500/20

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-violet-500
                        hover:shadow-lg

                        active:translate-y-0

                        focus:outline-none
                        focus:ring-2
                        focus:ring-violet-400
                    "
                >

                    📥 Download Report

                </button>

            </div>

        </div>

    );

}

export default QuizResult;