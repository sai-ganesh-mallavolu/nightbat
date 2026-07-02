import { useEffect, useState } from "react";

import {

    getQuiz,

    generateQuiz,

    saveQuizAttempt,

} from "../../services/quizService";

import QuizCard from "./QuizCard";
import QuizProgress from "./QuizProgress";
import QuizResult from "./QuizResult";
import QuizTimer from "./QuizTimer";
import QuestionPalette from "./QuestionPalette";
import QuizNavigation from "./QuizNavigation";
import SubmitQuizModal from "./SubmitQuizModal";
import QuizHistory from "./QuizHistory";

import { toast } from "react-toastify";

function QuizSection({ documentId }) {

    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(false);

    const [current, setCurrent] = useState(0);

    const [answers, setAnswers] = useState({});

    const [submitted, setSubmitted] = useState(false);

    const [showSubmitModal, setShowSubmitModal] = useState(false);

    const [secondsLeft, setSecondsLeft] = useState(600);

    const [result, setResult] = useState(null);

    const [timerKey, setTimerKey] = useState(0);

    // ==========================
    // Load Quiz
    // ==========================

    useEffect(() => {

        loadQuiz();

    }, [documentId]);

    const loadQuiz = async () => {

        try {

            const response = await getQuiz(documentId);

            if (response.questions.length > 0) {

                setQuestions(response.questions);

            }

        }

        catch (error) {

            console.error(error);

        }

    };

    // ==========================
    // Generate Quiz
    // ==========================

    const handleGenerate = async () => {

        try {

            setLoading(true);

            const response = await generateQuiz(documentId);

            setQuestions(response.questions);

            setCurrent(0);

            setAnswers({});

            setSubmitted(false);

            setResult(null);

            toast.success("Quiz generated!");

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to generate quiz.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Select Answer
    // ==========================

    const selectAnswer = (option) => {

        setAnswers((prev) => ({

            ...prev,

            [current]: option,

        }));

    };

    // ==========================
    // Navigation
    // ==========================

    const nextQuestion = () => {

        if (current >= questions.length - 1) return;

        setCurrent((prev) => prev + 1);

    };

    const previousQuestion = () => {

        if (current <= 0) return;

        setCurrent((prev) => prev - 1);

    };

    // ==========================
    // Submit
    // ==========================

    const submitQuiz = () => {

        setShowSubmitModal(true);

    };

    const confirmSubmit = async () => {

        setShowSubmitModal(false);

        let correct = 0;

        questions.forEach((question, index) => {

            if (answers[index] === question.correct_answer) {

                correct++;

            }

        });

        const answered = Object.keys(answers).length;

        const wrong = answered - correct;

        const unanswered = questions.length - answered;

        const percentage = Math.round(

            (correct / questions.length) * 100

        );

        const timeTaken = 600 - secondsLeft;

        const resultData = {

            correct,

            wrong,

            unanswered,

            percentage,

            timeTaken,

        };

        setResult(resultData);

        await saveQuizAttempt(

            documentId,

            {

                score: percentage,

                correct,

                wrong,

                skipped: unanswered,

                accuracy: percentage,

                time_taken: timeTaken,

            }

        );

        setSubmitted(true);

    };

    const restartQuiz = () => {

        setCurrent(0);

        setAnswers({});

        setSubmitted(false);

        setResult(null);

        setSecondsLeft(600);

        setTimerKey((prev) => prev + 1);

    };

    const answeredCount = Object.keys(answers).length;

    const unansweredQuestions = questions
        .map((_, index) => index + 1)
        .filter((index) => answers[index - 1] === undefined);

    // ==========================
    // Result Screen
    // ==========================

    if (submitted) {

        return (

            <>

                <QuizResult

                    questions={questions}

                    answers={answers}

                    result={result}

                    onRetake={restartQuiz}

                />

                <QuizHistory

                    documentId={documentId}

                />

            </>

        );

    }

    return (

        <div className="mt-12 rounded-3xl border border-cyan-500/20 bg-white/5 p-8 shadow-xl">

            <h2 className="mb-2 text-3xl font-bold text-white">

                📝 AI Quiz

            </h2>

            <p className="mb-8 text-gray-400">

                Test your understanding with AI-generated questions.

            </p>

            {

                questions.length === 0 ? (

                    <div className="py-20 text-center">

                        <button

                            onClick={handleGenerate}

                            disabled={loading}

                            className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-60"

                        >

                            {

                                loading

                                    ? "Generating Quiz..."

                                    : "⚡ Generate Quiz"

                            }

                        </button>

                    </div>

                ) : (

                    <>

                        {/* Timer */}

                        <QuizTimer
                            key={timerKey}
                            totalSeconds={600}
                            onTimeUp={confirmSubmit}
                            onTick={setSecondsLeft}
                        />

                        {/* Progress */}

                        <QuizProgress

                            current={current}

                            total={questions.length}

                        />

                        {/* Question Palette */}

                        <QuestionPalette

                            total={questions.length}

                            current={current}

                            answers={answers}

                            onSelect={setCurrent}

                        />

                        {/* Quiz Card */}

                        <QuizCard

                            question={questions[current]}

                            selected={answers[current]}

                            onSelect={selectAnswer}

                        />

                        {/* Navigation */}

                        <QuizNavigation

                            current={current}

                            total={questions.length}

                            previousQuestion={previousQuestion}

                            nextQuestion={nextQuestion}

                            submitQuiz={submitQuiz}

                        />

                    </>

                )

            }

            {/* Submit Confirmation Modal */}

            <SubmitQuizModal

                open={showSubmitModal}

                answered={answeredCount}

                total={questions.length}

                unansweredQuestions={unansweredQuestions}

                onCancel={() => setShowSubmitModal(false)}

                onSubmit={confirmSubmit}

                onQuestionSelect={(questionNo) => {

                    setCurrent(questionNo - 1);

                    setShowSubmitModal(false);

                }}

            />

        </div>

    );

}

export default QuizSection;