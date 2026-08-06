import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";


import {
    getDocument,
    reanalyzeDocument,
    getQuizStatus,
    getFlashcardStatus,
} from "../services/historyService";

import SummaryCard from "../components/results/SummaryCard";
import KeyPointsCard from "../components/results/KeyPointsCard";
import ActionItemsCard from "../components/results/ActionItemsCard";

import ChatBox from "../components/chat/ChatBox";
import FlashcardsSection from "../components/flashcards/FlashcardsSection";
import QuizSection from "../components/quiz/QuizSection";
import QuizHistory from "../components/quiz/QuizHistory";

import { toast } from "react-toastify";
import { downloadReport } from "../pdf/downloadReport";




function DocumentDetails() {

    const { id } = useParams();

    const [document, setDocument] = useState(null);

    const [loading, setLoading] = useState(true);

    const [analyzing, setAnalyzing] = useState(false);

    const [quizStatus, setQuizStatus] = useState(null);

    const [flashStatus, setFlashStatus] = useState(null);

    const [showQuiz, setShowQuiz] = useState(false);

    const [showFlashcards, setShowFlashcards] = useState(false);

    const [openingFlashcards, setOpeningFlashcards] = useState(false);

    const [openingQuiz, setOpeningQuiz] = useState(false);

    const [quizHistoryRefreshKey, setQuizHistoryRefreshKey] = useState(0);

    const analysisRef = useRef(null);


    // ==========================
    // Load Document
    // ==========================

    useEffect(() => {

        fetchDocument();

    }, [id]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, []);


    // ==========================
    // Fetch Document
    // ==========================

    const fetchDocument = async () => {

        try {

            setLoading(true);

            const data = await getDocument(id);

            setDocument(data);

            const flash =
                await getFlashcardStatus(id);

            setFlashStatus(flash);

            const quiz =
                await getQuizStatus(id);

            setQuizStatus(quiz);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load document."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================
    // Refresh Flashcard Status
    // ==========================

    const refreshFlashcardStatus = async () => {

        try {

            const flash =
                await getFlashcardStatus(id);

            setFlashStatus(flash);

        }

        catch (error) {

            console.error(
                "Failed to refresh flashcard status:",
                error
            );

        }

    };


    // ==========================
    // Refresh Quiz Status
    // ==========================

    const refreshQuizStatus = async () => {

        try {

            const quiz =
                await getQuizStatus(id);

            setQuizStatus(quiz);

        }

        catch (error) {

            console.error(
                "Failed to refresh quiz status:",
                error
            );

        }

    };


    // ==========================
    // Reanalyze Document
    // ==========================

    const handleReanalyze = async () => {

        try {

            setAnalyzing(true);

            await reanalyzeDocument(id);

            await fetchDocument();



            toast.success(
                "Analysis completed successfully!"
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Failed to analyze document."
            );

        }

        finally {

            setAnalyzing(false);

        }

    };


    // ==========================
    // Download PDF
    // ==========================

    const handleDownloadPDF = async () => {

        try {

            await downloadReport({

                filename: document.filename,

                summary: document.summary,

                keyPoints: document.key_points,

                actionItems: document.action_items,

            });

            toast.success(
                "PDF downloaded successfully!"
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Failed to generate PDF."
            );

        }

    };

    const handleCopyAll = async () => {

        try {

            const content = `📄 SUMMARY

            ${document.summary}

            ━━━━━━━━━━━━━━━━━━━━

            📌 KEY POINTS

            ${document.key_points.map((point, i) => `${i + 1}. ${point}`).join("\n")}

            ━━━━━━━━━━━━━━━━━━━━

            ✅ ACTION ITEMS

            ${document.action_items.map((item, i) => `${i + 1}. ${item}`).join("\n")}
            `;

            await navigator.clipboard.writeText(content);

            toast.success("Copied all analysis! 📋");

        }

        catch {

            toast.error("Failed to copy.");

        }

    };

    const handleOpenFlashcards = () => {
        if (openingFlashcards || showFlashcards) return;

        setOpeningFlashcards(true);
        setShowFlashcards(true);
    };

    const handleOpenQuiz = () => {
        if (openingQuiz || showQuiz) return;

        setOpeningQuiz(true);
        setShowQuiz(true);
    };


    // ==========================
    // Loading Screen
    // ==========================

    if (loading) {

        return (

            <section
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-gradient-to-b
                    from-white
                    via-slate-50
                    to-slate-100
                    px-6

                    dark:from-[#09090b]
                    dark:via-[#0c0c0f]
                    dark:to-[#111113]
                "
            >

                <div className="text-center">

                    <div className="animate-pulse text-7xl">
                        🤖
                    </div>

                    <h2
                        className="
                            mt-6
                            text-4xl
                            font-bold
                            text-cyan-600

                            dark:text-cyan-400
                        "
                    >
                        Loading Workspace...
                    </h2>

                    <p
                        className="
                            mt-3
                            text-slate-500

                            dark:text-zinc-500
                        "
                    >
                        Preparing your AI workspace...
                    </p>

                </div>

            </section>

        );

    }


    // ==========================
    // Document Information
    // ==========================

    const hasAnalysis =

        document.summary ||

        document.key_points.length > 0 ||

        document.action_items.length > 0;


    const extension = document.filename
        .split(".")
        .pop()
        .toLowerCase();


    const getIcon = () => {

        switch (extension) {

            case "pdf":
                return "📕";

            case "doc":
            case "docx":
                return "📘";

            case "txt":
                return "📄";

            default:
                return "📁";

        }

    };


    return (

        <section
            className="
                min-h-screen
                bg-gradient-to-b
                from-white
                via-slate-50
                to-slate-100
                px-4
                py-10
                sm:px-6
                lg:px-8
                sm:py-16
                lg:py-20
                text-slate-900
                transition-colors
                duration-300

                dark:from-[#09090b]
                dark:via-[#0c0c0f]
                dark:to-[#111113]
                dark:text-white
            "
        >

            <div className="mx-auto max-w-7xl">


                {/* ==========================
                    Document Header
                ========================== */}

                <div
                    className="
                        rounded-3xl
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

                    <div
                        className="
                            flex
                            flex-col
                            gap-8

                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >


                        {/* Document Information */}

                        <div className="flex items-start gap-6">

                            <div
                                className="
                                    flex
                                    h-16
                                    w-16
                                    text-4xl

                                    sm:h-20
                                    sm:w-20
                                    sm:text-5xl

                                    lg:h-24
                                    lg:w-24
                                    lg:text-6xl
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-3xl
                                    bg-cyan-50
                                    

                                    dark:bg-cyan-500/10
                                "
                            >

                                {getIcon()}

                            </div>


                            <div className="min-w-0">

                                <h1
                                    className="
                                    break-all
                                    text-xl
                                    sm:text-2xl
                                    lg:text-4xl
                                    font-extrabold
                                        text-slate-950

                                        dark:text-white
                                    "
                                >

                                    {document.filename}

                                </h1>


                                <p
                                    className="
                                        mt-3
                                        text-slate-500

                                        dark:text-zinc-400
                                    "
                                >

                                    {extension.toUpperCase()}
                                    {" • "}

                                    {new Date(
                                        document.uploaded_at
                                    ).toLocaleString()}

                                </p>


                                {/* Analysis Status */}

                                <div className="mt-5">

                                    {hasAnalysis ? (

                                        <span
                                            className="
                                                inline-flex
                                                items-center
                                                rounded-full
                                                border
                                                border-green-200
                                                bg-green-50
                                                px-4
                                                py-2
                                                text-sm
                                                font-semibold
                                                text-green-700

                                                dark:border-green-500/30
                                                dark:bg-green-500/10
                                                dark:text-green-400
                                            "
                                        >

                                            🟢 AI Analysis Ready

                                        </span>

                                    ) : (

                                        <span
                                            className="
                                                inline-flex
                                                items-center
                                                rounded-full
                                                border
                                                border-amber-200
                                                bg-amber-50
                                                px-4
                                                py-2
                                                text-sm
                                                font-semibold
                                                text-amber-700

                                                dark:border-yellow-500/30
                                                dark:bg-yellow-500/10
                                                dark:text-yellow-400
                                            "
                                        >

                                            🟡 Needs Analysis

                                        </span>

                                    )}

                                </div>

                            </div>

                        </div>


                        {/* Header Actions */}

                        {hasAnalysis && (

                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">


                                {/* Copy All */}

                                <button
                                    type="button"
                                    onClick={handleCopyAll}
                                    className="
                                        rounded-xl
                                        border
                                        border-cyan-200
                                        bg-cyan-50
                                        w-full
                                        sm:w-auto
                                        px-5
                                        py-3
                                        font-semibold
                                        text-cyan-700
                                        transition-all
                                        duration-300

                                        hover:border-cyan-300
                                        hover:bg-cyan-100

                                        dark:border-cyan-500/20
                                        dark:bg-cyan-500/10
                                        dark:text-cyan-400
                                        dark:hover:bg-cyan-500/20
                                    "
                                >

                                    📋 Copy All

                                </button>


                                {/* Download PDF */}

                                <button
                                    type="button"
                                    onClick={handleDownloadPDF}
                                    className="
                                        rounded-xl
                                        border
                                        border-violet-200
                                        bg-violet-50
                                        w-full
                                        sm:w-auto
                                        px-5
                                        py-3
                                        font-semibold
                                        text-violet-700
                                        transition-all
                                        duration-300

                                        hover:border-violet-300
                                        hover:bg-violet-100

                                        dark:border-violet-500/20
                                        dark:bg-violet-500/10
                                        dark:text-violet-300
                                        dark:hover:bg-violet-500/20
                                    "
                                >

                                    📥 Download PDF

                                </button>

                            </div>

                        )}

                    </div>

                </div>


                {/* ==========================
                    No Analysis State
                ========================== */}

                {!hasAnalysis ? (

                    <div
                        className="
                            mt-12
                            rounded-3xl
                            border
                            border-amber-200
                            bg-amber-50
                            p-12
                            text-center
                            shadow-sm

                            dark:border-yellow-500/20
                            dark:bg-yellow-500/10
                            dark:shadow-none
                        "
                    >

                        <div className="text-8xl">
                            ⚠️
                        </div>

                        <h2
                            className="
                                mt-6
                                text-xl
                                sm:text-2xl
                                lg:text-4xl
                                font-bold
                                text-slate-950

                                dark:text-white
                            "
                        >

                            AI Analysis Required

                        </h2>

                        <p
                            className="
                                mt-5
                                text-lg
                                text-slate-600

                                dark:text-zinc-400
                            "
                        >

                            This document was uploaded before AI analysis was available.

                        </p>

                        <button
                            type="button"
                            onClick={handleReanalyze}
                            disabled={analyzing}
                            className="
                                mt-10
                                rounded-2xl
                                bg-cyan-500
                                w-full
                                sm:w-auto
                                px-10
                                py-4
                                text-lg
                                font-bold
                                text-slate-950
                                shadow-lg
                                shadow-cyan-500/20
                                transition-all
                                duration-300

                                hover:-translate-y-0.5
                                hover:bg-cyan-400

                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                disabled:hover:translate-y-0
                            "
                        >

                            {analyzing
                                ? "🤖 Analyzing..."
                                : "🚀 Analyze Document"}

                        </button>

                    </div>

                ) : (

                    <>


                        {/* ==========================
                            Analysis Results
                        ========================== */}

                        <div
                            // ref={analysisRef}
                            className="mt-12 grid gap-8"
                        >

                            <SummaryCard
                                summary={document.summary}
                            />

                            <KeyPointsCard
                                points={document.key_points}
                            />

                            <ActionItemsCard
                                items={document.action_items}
                            />

                        </div>


                        {/* ==========================
                            AI Chat
                        ========================== */}

                        <div className="mt-14">

                            <div className="mb-6">

                                <h2
                                    className="
                                        text-2xl
                                        sm:text-3xl
                                        font-bold
                                        text-slate-950

                                        dark:text-white
                                    "
                                >

                                    💬 AI Assistant

                                </h2>

                                <p
                                    className="
                                        mt-2
                                        text-slate-600

                                        dark:text-zinc-400
                                    "
                                >

                                    Ask questions about this document.

                                </p>

                            </div>

                            <ChatBox
                                documentId={id}
                            />

                        </div>


                        {/* ==========================
                            Flashcards
                        ========================== */}

                        <div className="mt-14">

                            <h2
                                className="
                                    text-2xl
                                    sm:text-3xl
                                    font-bold
                                    text-slate-950

                                    dark:text-white
                                "
                            >

                                📚 Flashcards

                            </h2>

                            <p
                                className="
                                    mt-2
                                    text-slate-600

                                    dark:text-zinc-400
                                "
                            >

                                Study using AI generated flashcards.

                            </p>


                            {flashStatus?.generated ? (

                                <div
                                    className="
                                        mt-6
                                        rounded-3xl
                                        border
                                        border-green-200
                                        bg-green-50
                                        p-8

                                        dark:border-green-500/20
                                        dark:bg-green-500/10
                                    "
                                >

                                    <h3
                                        className="
                                            text-2xl
                                            font-bold
                                            text-slate-950

                                            dark:text-white
                                        "
                                    >

                                        {flashStatus.completed
                                            ? "✅ Flashcards Completed"
                                            : "📚 Flashcards Ready"}

                                    </h3>


                                    <div className="mt-6">

                                        <p
                                            className="
                                                text-lg
                                                text-slate-700

                                                dark:text-zinc-200
                                            "
                                        >

                                            Learned{" "}

                                            <strong>

                                                {flashStatus.learned}
                                                /
                                                {flashStatus.total}

                                            </strong>

                                        </p>


                                        {/* Progress Bar */}

                                        <div
                                            className="
                                                mt-4
                                                h-3
                                                overflow-hidden
                                                rounded-full
                                                bg-slate-200

                                                dark:bg-white/10
                                            "
                                        >

                                            <div

                                                className="
                                                    h-3
                                                    rounded-full
                                                    bg-cyan-500
                                                    transition-all

                                                    dark:bg-cyan-400
                                                "

                                                style={{

                                                    width: `${flashStatus.total
                                                        ? (
                                                            flashStatus.learned /
                                                            flashStatus.total
                                                        ) * 100
                                                        : 0
                                                        }%`,

                                                }}

                                            />

                                        </div>

                                    </div>


                                    <button

                                        type="button"

                                        onClick={handleOpenFlashcards}

                                        className="
                                            mt-8
                                            rounded-xl
                                            bg-cyan-500
                                            w-full
                                            sm:w-auto
                                            px-8
                                            py-4
                                            font-bold
                                            text-slate-950
                                            transition-all
                                            duration-300

                                            hover:bg-cyan-400
                                        "

                                    >

                                        {flashStatus.completed
                                            ? "📖 Continue Flashcards"
                                            : "🚀 Open Flashcards"}

                                    </button>

                                </div>

                            ) : (

                                <div
                                    className="
                                        mt-6
                                        rounded-3xl
                                        border
                                        border-slate-200
                                        bg-white
                                        p-8
                                        text-center
                                        shadow-sm

                                        dark:border-white/10
                                        dark:bg-[#18181b]
                                        dark:shadow-none
                                    "
                                >

                                    <h3
                                        className="
                                            text-2xl
                                            font-bold
                                            text-slate-950

                                            dark:text-white
                                        "
                                    >

                                        No Flashcards Generated

                                    </h3>

                                    <p
                                        className="
                                            mt-3
                                            text-slate-600

                                            dark:text-zinc-400
                                        "
                                    >

                                        Generate AI flashcards from this document.

                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleOpenFlashcards}
                                        disabled={openingFlashcards}
                                        className="
                                            mt-8
                                            rounded-xl
                                            bg-cyan-500
                                            px-8
                                            py-4
                                            font-bold
                                            text-slate-950
                                            transition-all
                                            duration-300

                                            hover:bg-cyan-400

                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                            disabled:hover:bg-cyan-500
                                            "
                                    >
                                        {openingFlashcards
                                            ? "⏳ Generating Flashcards..."
                                            : "🚀 Generate Flashcards"}
                                    </button>

                                </div>

                            )}


                            {showFlashcards && (

                                <div className="mt-8">

                                    <FlashcardsSection
                                        documentId={document.id}
                                        onGenerated={async () => {
                                            await refreshFlashcardStatus();
                                            setOpeningFlashcards(false);
                                        }}
                                        onStatusChange={refreshFlashcardStatus}
                                    />

                                </div>

                            )}

                        </div>


                        {/* ==========================
                            AI Quiz
                        ========================== */}

                        <div className="mt-14">

                            <h2
                                className="
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
                                    mt-2
                                    text-slate-600

                                    dark:text-zinc-400
                                "
                            >

                                Test your understanding using AI.

                            </p>


                            {quizStatus?.generated ? (

                                <div
                                    className="
                                        mt-6
                                        rounded-3xl
                                        border
                                        border-green-200
                                        bg-green-50
                                        p-8

                                        dark:border-green-500/20
                                        dark:bg-green-500/10
                                    "
                                >

                                    <h3
                                        className="
                                            text-2xl
                                            font-bold
                                            text-slate-950

                                            dark:text-white
                                        "
                                    >

                                        ✅ Quiz Available

                                    </h3>


                                    <div
                                        className="
                                            mt-6
                                            grid
                                            gap-6

                                            md:grid-cols-3
                                        "
                                    >


                                        {/* Questions */}

                                        <div>

                                            <p
                                                className="
                                                    text-slate-500

                                                    dark:text-zinc-400
                                                "
                                            >

                                                Questions

                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    text-3xl
                                                    font-bold
                                                    text-slate-950

                                                    dark:text-white
                                                "
                                            >

                                                {quizStatus.questions}

                                            </p>

                                        </div>


                                        {/* Attempts */}

                                        <div>

                                            <p
                                                className="
                                                    text-slate-500

                                                    dark:text-zinc-400
                                                "
                                            >

                                                Attempts

                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    text-3xl
                                                    font-bold
                                                    text-slate-950

                                                    dark:text-white
                                                "
                                            >

                                                {quizStatus.attempts}

                                            </p>

                                        </div>


                                        {/* Best Score */}

                                        <div>

                                            <p
                                                className="
                                                    text-slate-500

                                                    dark:text-zinc-400
                                                "
                                            >

                                                Best Score

                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    text-3xl
                                                    font-bold
                                                    text-slate-950

                                                    dark:text-white
                                                "
                                            >

                                                {quizStatus.best_score}

                                            </p>

                                        </div>

                                    </div>


                                    <button

                                        type="button"

                                        onClick={handleOpenQuiz}

                                        className="
                                            mt-8
                                            rounded-xl
                                            bg-cyan-500
                                            w-full
                                            sm:w-auto
                                            px-8
                                            py-4
                                            font-bold
                                            text-slate-950
                                            transition-all
                                            duration-300

                                            hover:bg-cyan-400
                                        "
                                    >

                                        📖 Continue Quiz

                                    </button>

                                    <QuizHistory
                                        documentId={document.id}
                                        refreshKey={quizHistoryRefreshKey}
                                    />

                                </div>

                            ) : (

                                <div
                                    className="
                                        mt-6
                                        rounded-3xl
                                        border
                                        border-slate-200
                                        bg-white
                                        p-8
                                        text-center
                                        shadow-sm

                                        dark:border-white/10
                                        dark:bg-[#18181b]
                                        dark:shadow-none
                                    "
                                >

                                    <h3
                                        className="
                                            text-2xl
                                            font-bold
                                            text-slate-950

                                            dark:text-white
                                        "
                                    >

                                        No Quiz Generated

                                    </h3>

                                    <p
                                        className="
                                            mt-3
                                            text-slate-600

                                            dark:text-zinc-400
                                        "
                                    >

                                        Generate AI questions from this document.

                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleOpenQuiz}
                                        disabled={openingQuiz}
                                        className="
                                            mt-8
                                            rounded-xl
                                            bg-cyan-500
                                            w-full
                                            sm:w-auto
                                            px-8
                                            py-4
                                            font-bold
                                            text-slate-950
                                            transition-all
                                            duration-300

                                            hover:bg-cyan-400

                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                            disabled:hover:bg-cyan-500
                                        "
                                    >
                                        {openingQuiz
                                            ? "⏳ Generating Quiz..."
                                            : "🚀 Generate Quiz"}
                                    </button>

                                </div>

                            )}


                            {showQuiz && (

                                <div className="mt-8">

                                    <QuizSection
                                        documentId={document.id}
                                        onGenerated={async () => {

                                            try {

                                                await refreshQuizStatus();

                                            } finally {

                                                setOpeningQuiz(false);

                                            }

                                        }}
                                        onStatusChange={refreshQuizStatus}
                                        onAttemptSaved={() =>
                                            setQuizHistoryRefreshKey(
                                                (prev) => prev + 1
                                            )
                                        }
                                    />
                                </div>

                            )}

                        </div>

                    </>

                )}

            </div>

        </section>

    );

}

export default DocumentDetails;