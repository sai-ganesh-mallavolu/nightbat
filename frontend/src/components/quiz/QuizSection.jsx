import { useEffect, useRef, useState } from "react";

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

import { toast } from "react-toastify";

function QuizSection({
    documentId,
    onGenerated,
    onStatusChange,
    onAttemptSaved,
}) {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const generatingRef = useRef(false);
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

        if (!documentId) return;

        loadQuiz();

    }, [documentId]);

    const loadQuiz = async () => {

        try {

            const response = await getQuiz(documentId);

            const loadedQuestions =
                response.questions || [];

            if (loadedQuestions.length === 0) {

                await handleGenerate();
                return;

            }

            setQuestions(loadedQuestions);

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Failed to load quiz."

            );

        }

    };

    // ==========================
    // Generate Quiz
    // ==========================

    const handleGenerate = async () => {

        if (loading || generatingRef.current) {
            return;
        }

        generatingRef.current = true;

        try {

            setLoading(true);

            const response =
                await generateQuiz(documentId);

            setQuestions(
                response.questions || []
            );

            setCurrent(0);

            setAnswers({});

            setSubmitted(false);

            setResult(null);

            setSecondsLeft(600);

            setTimerKey(
                (prev) => prev + 1
            );

            await onGenerated?.();

            toast.success(
                "Quiz generated!"
            );

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Failed to generate quiz."

            );

        }

        finally {

            generatingRef.current = false;

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

        if (current >= questions.length - 1) {
            return;
        }

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

            if (

                answers[index] ===

                question.correct_answer

            ) {

                correct++;

            }

        });

        const answered =

            Object.keys(answers).length;

        const wrong =

            answered - correct;

        const unanswered =

            questions.length - answered;

        const percentage =

            Math.round(

                (correct / questions.length) * 100

            );

        const timeTaken =

            600 - secondsLeft;

        const resultData = {

            correct,

            wrong,

            unanswered,

            percentage,

            timeTaken,

        };

        try {

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

            await onStatusChange?.();

            onAttemptSaved?.();

            setResult(resultData);

            setSubmitted(true);



            toast.success(

                "Quiz submitted successfully!"

            );

        }

        catch (error) {

            console.error(

                "Failed to submit quiz:",

                error

            );

            toast.error(

                error?.response?.data?.message ||

                "Failed to save quiz attempt."

            );

        }

    };


    // ==========================
    // Restart Quiz
    // ==========================

    const restartQuiz = () => {

        setCurrent(0);

        setAnswers({});

        setSubmitted(false);

        setResult(null);

        setSecondsLeft(600);

        setTimerKey(

            (prev) => prev + 1

        );

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    };

    const answeredCount =
        Object.keys(answers).length;

    const unansweredQuestions =
        questions
            .map((_, index) => index + 1)
            .filter(
                (index) =>
                    answers[index - 1] ===
                    undefined
            );

    // ==========================
    // Result Screen
    // ==========================

    if (submitted) {

        return (

            <QuizResult
                questions={questions}
                answers={answers}
                result={result}
                onRetake={restartQuiz}
            />

        );

    }

    return (

        <div
            className="
                mt-8
                sm:mt-10
                lg:mt-12

                rounded-2xl
                sm:rounded-3xl

                border
                border-slate-200

                bg-white

                p-5
                sm:p-6
                lg:p-8

                shadow-xl
                shadow-slate-200/50

                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none
            "
        >

            {/* ==========================
                Header
            ========================== */}

            <h2
                className="
                    mb-2

                    text-2xl
                    sm:text-3xl

                    font-bold

                    text-slate-950

                    dark:text-white
                "
            >
                📝 AI Quiz
            </h2>

            <p
                className="
                    mb-8

                    text-sm
                    sm:text-base

                    leading-7

                    text-slate-600

                    dark:text-zinc-400
                "
            >
                Test your understanding with AI-generated questions.
            </p>

            {/* ==========================
                Quiz Content
            ========================== */}

            {questions.length === 0 ? (

                <div
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center

                        py-16
                        sm:py-20

                        text-center
                    "
                >

                    <div
                        className="
                            mb-6

                            animate-spin

                            text-5xl
                            sm:text-6xl
                        "
                    >
                        🧠
                    </div>

                    <h3
                        className="
                            text-xl
                            sm:text-2xl

                            font-bold

                            dark:text-white
                        "
                    >
                        {loading
                            ? "Generating Quiz..."
                            : "Loading Quiz..."}
                    </h3>

                    <p
                        className="
                            mt-4

                            max-w-md

                            text-sm
                            sm:text-base

                            leading-7

                            text-slate-600

                            dark:text-zinc-400
                        "
                    >
                        NightBat AI is preparing your quiz.
                        Please wait...
                    </p>

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
                        onSelect={(index) => {

                            setCurrent(index);



                        }}
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

            )}

            {/* ==========================
                Submit Confirmation
            ========================== */}

            <SubmitQuizModal
                open={showSubmitModal}
                answered={answeredCount}
                total={questions.length}
                unansweredQuestions={unansweredQuestions}
                onCancel={() =>
                    setShowSubmitModal(false)
                }
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