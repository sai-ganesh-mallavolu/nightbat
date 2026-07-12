import { useEffect, useState } from "react";

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

    const { width, height } = useWindowSize();

    const [animatedPercentage, setAnimatedPercentage] =
        useState(0);


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


    // ==========================
    // Performance Message
    // ==========================

    const getMessage = () => {

        if (result.percentage >= 90) {

            return "Outstanding Performance! 🎉";

        }

        if (result.percentage >= 75) {

            return "Excellent Work! 👏";

        }

        if (result.percentage >= 60) {

            return "Good Job! 👍";

        }

        return "Keep Practicing 💪";

    };


    // ==========================
    // Download Quiz Report
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
            className="
                mt-12
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-10
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
                    width={width}
                    height={height}
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
                        text-4xl
                        font-bold
                        text-slate-950

                        md:text-5xl

                        dark:text-white
                    "
                >

                    🎉 Quiz Completed

                </h1>


                <p
                    className="
                        mt-4
                        text-xl
                        text-slate-600

                        dark:text-zinc-400
                    "
                >

                    {getMessage()}

                </p>

            </div>


            {/* ==========================
                Score Banner
            ========================== */}

            <div
                className="
                    mt-10
                    rounded-3xl
                    border
                    border-cyan-200
                    bg-cyan-50
                    p-8
                    text-center

                    dark:border-cyan-500/20
                    dark:bg-cyan-500/10
                "
            >

                <h2
                    className="
                        text-5xl
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
                    mt-12
                    flex
                    justify-center
                "
            >

                <ScoreCircle
                    percentage={
                        animatedPercentage
                    }
                />

            </div>


            {/* ==========================
                Badge
            ========================== */}

            <div className="mt-10">

                <BadgeCard
                    percentage={
                        result.percentage
                    }
                />

            </div>


            {/* ==========================
                AI Feedback
            ========================== */}

            <div
                className="
                    mt-10
                    rounded-3xl
                    border
                    border-cyan-200
                    bg-cyan-50
                    p-8

                    dark:border-cyan-500/20
                    dark:bg-cyan-500/10
                "
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-cyan-700

                        dark:text-cyan-300
                    "
                >

                    🤖 NightBat AI Feedback

                </h2>


                <p
                    className="
                        mt-5
                        leading-8
                        text-slate-700

                        dark:text-zinc-300
                    "
                >

                    {
                        result.percentage >= 90

                            ? "Outstanding! You have mastered this document exceptionally well. Keep maintaining this level of performance."

                            : result.percentage >= 75

                                ? "Excellent understanding! Review only the questions you missed to achieve perfection."

                                : result.percentage >= 60

                                    ? "Good attempt. Spend a little more time reviewing the explanations for incorrect answers."

                                    : "You should revise this document once more and attempt the quiz again. Practice will improve your score."
                    }

                </p>

            </div>


            {/* ==========================
                Statistics
            ========================== */}

            <QuizStats
                result={result}
            />


            {/* ==========================
                Review Heading
            ========================== */}

            <div className="mt-16">

                <h2
                    className="
                        text-3xl
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
                        text-slate-600

                        dark:text-zinc-400
                    "
                >

                    Check every answer along
                    with the explanation.

                </p>

            </div>


            {/* ==========================
                Review Cards
            ========================== */}

            <div className="mt-10 space-y-8">

                {questions.map(
                    (question, index) => {

                        const correct =

                            answers[index] ===
                            question.correct_answer;


                        return (

                            <div
                                key={
                                    question.id ??
                                    index
                                }
                                className={`
                                    rounded-2xl
                                    border
                                    p-8
                                    transition-all
                                    duration-300

                                    ${correct

                                        ? `
                                                border-green-200
                                                bg-gradient-to-r
                                                from-green-50
                                                to-white

                                                dark:border-green-500/20
                                                dark:from-green-500/10
                                                dark:to-transparent
                                            `

                                        : `
                                                border-red-200
                                                bg-gradient-to-r
                                                from-red-50
                                                to-white

                                                dark:border-red-500/20
                                                dark:from-red-500/10
                                                dark:to-transparent
                                            `
                                    }
                                `}
                            >


                                {/* Question Number */}

                                <h3
                                    className="
                                        text-xl
                                        font-semibold
                                        text-slate-950

                                        dark:text-white
                                    "
                                >

                                    Question {index + 1}

                                </h3>


                                {/* Question */}

                                <p
                                    className="
                                        mt-4
                                        break-words
                                        text-lg
                                        leading-8
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
                                                text-2xl
                                                font-bold

                                                ${correct

                                                    ? "text-green-600 dark:text-green-400"

                                                    : "text-red-600 dark:text-red-400"
                                                }
                                            `}
                                        >

                                            {
                                                answers[index]

                                                    ? `Option ${answers[index]}`

                                                    : "Not Answered"
                                            }

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
                                                text-2xl
                                                font-bold
                                                text-green-600

                                                dark:text-green-400
                                            "
                                        >

                                            Option {
                                                question.correct_answer
                                            }

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
                                        p-6

                                        dark:border-white/10
                                        dark:bg-[#111113]
                                    "
                                >

                                    <h4
                                        className="
                                            text-lg
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
                                            leading-8
                                            text-slate-700

                                            dark:text-zinc-300
                                        "
                                    >

                                        {question.explanation}

                                    </p>

                                </div>

                            </div>

                        );

                    }
                )}

            </div>


            {/* ==========================
                Bottom Buttons
            ========================== */}

            <div
                className="
                    mt-16
                    flex
                    flex-wrap
                    justify-center
                    gap-5
                "
            >


                {/* Retake Quiz */}

                <button
                    type="button"
                    onClick={onRetake}
                    className="
                        cursor-pointer
                        rounded-xl
                        bg-cyan-500
                        px-8
                        py-4
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

                    🔄 Retake Quiz

                </button>


                {/* Download Report */}

                <button
                    type="button"
                    onClick={handleDownload}
                    className="
                        cursor-pointer
                        rounded-xl
                        bg-violet-600
                        px-8
                        py-4
                        font-semibold
                        text-white
                        shadow-md
                        shadow-violet-500/20
                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-violet-500
                        hover:shadow-lg
                    "
                >

                    📥 Download Report

                </button>

            </div>

        </div>

    );

}

export default QuizResult;