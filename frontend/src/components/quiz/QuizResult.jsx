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

    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    useEffect(() => {

        let value = 0;

        const interval = setInterval(() => {

            value++;

            setAnimatedPercentage(value);

            if (value >= result.percentage) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [result.percentage]);

    const getMessage = () => {

        if (result.percentage >= 90)

            return "Outstanding Performance! 🎉";

        if (result.percentage >= 75)

            return "Excellent Work! 👏";

        if (result.percentage >= 60)

            return "Good Job! 👍";

        return "Keep Practicing 💪";

    };

    const handleDownload = () => {

        downloadQuizReport({

            documentName: "NightBat AI Quiz",

            questions,

            answers,

            result,

        });

    };

    return (

        <div className="mt-12 rounded-3xl border border-cyan-500/20 bg-white/5 p-10 shadow-2xl">

            {

                result.percentage >= 90 && (

                    <Confetti

                        width={width}

                        height={height}

                        recycle={false}

                        numberOfPieces={350}

                    />

                )

            }

            {/* Heading */}

            <div className="text-center">

                <h1 className="text-5xl font-bold text-white">

                    🎉 Quiz Completed

                </h1>

                <p className="mt-4 text-xl text-gray-400">

                    {getMessage()}

                </p>

            </div>

            {/* Score Banner */}

            <div className="mt-10 rounded-3xl bg-cyan-500/10 p-8 text-center">

                <h2 className="text-5xl font-bold text-cyan-300">

                    {result.correct} / {questions.length}

                </h2>

                <p className="mt-3 text-gray-300">

                    Questions Answered Correctly

                </p>

            </div>

            {/* Score Circle */}

            <div className="relative mt-12 flex justify-center">

                <ScoreCircle

                    percentage={animatedPercentage}

                />

            </div>

            {/* Badge */}

            <div className="mt-10">

                <BadgeCard

                    percentage={result.percentage}

                />

            </div>

            {/* AI Feedback */}

            <div className="mt-10 rounded-3xl bg-cyan-500/10 p-8">

                <h2 className="text-2xl font-bold text-cyan-300">

                    🤖 NightBat AI Feedback

                </h2>

                <p className="mt-5 leading-8 text-gray-300">

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

            {/* Statistics */}

            <QuizStats

                result={result}

            />

            {/* Review Heading */}

            <div className="mt-16">

                <h2 className="text-3xl font-bold text-white">

                    📖 Review Answers

                </h2>

                <p className="mt-2 text-gray-400">

                    Check every answer along with the explanation.

                </p>

            </div>

            {/* Review Cards */}

            <div className="mt-10 space-y-8">

                {

                    questions.map((question, index) => {

                        const correct =

                            answers[index] ===

                            question.correct_answer;

                        return (

                            <div

                                key={question.id}

                                className={`rounded-2xl border p-8 transition duration-300

                                ${correct

                                        ? "border-green-500/30 bg-gradient-to-r from-green-500/10 to-transparent"

                                        : "border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent"

                                    }`}

                            >

                                <h3 className="text-xl font-semibold text-white">

                                    Question {index + 1}

                                </h3>

                                <p className="mt-4 text-lg leading-8 text-gray-200">

                                    {question.question}

                                </p>

                                <div className="mt-8 grid gap-4 md:grid-cols-2">

                                    <div className="rounded-xl bg-black/20 p-5">

                                        <p className="font-semibold text-gray-400">

                                            Your Answer

                                        </p>

                                        <p

                                            className={`mt-3 text-2xl font-bold

                                            ${correct

                                                    ? "text-green-400"

                                                    : "text-red-400"

                                                }`}

                                        >

                                            {

                                                answers[index]

                                                    ? `Option ${answers[index]}`

                                                    : "Not Answered"

                                            }

                                        </p>

                                    </div>

                                    <div className="rounded-xl bg-black/20 p-5">

                                        <p className="font-semibold text-gray-400">

                                            Correct Answer

                                        </p>

                                        <p className="mt-3 text-2xl font-bold text-green-400">

                                            Option {question.correct_answer}

                                        </p>

                                    </div>

                                </div>

                                <div className="mt-8 rounded-2xl bg-slate-900 p-6">

                                    <h4 className="text-lg font-bold text-cyan-300">

                                        💡 Explanation

                                    </h4>

                                    <p className="mt-4 leading-8 text-gray-300">

                                        {question.explanation}

                                    </p>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            {/* Bottom Buttons */}

            <div className="mt-16 flex flex-wrap justify-center gap-5">

                <button

                    onClick={onRetake}

                    className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-cyan-400"

                >

                    🔄 Retake Quiz

                </button>

                <button

                    onClick={handleDownload}

                    className="rounded-xl bg-violet-600 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-violet-500"

                >

                    📥 Download Report

                </button>
            </div>

        </div>

    );

}

export default QuizResult;
