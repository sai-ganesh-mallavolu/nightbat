import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getDocument,
    reanalyzeDocument,
} from "../services/historyService";

import SummaryCard from "../components/results/SummaryCard";
import KeyPointsCard from "../components/results/KeyPointsCard";
import ActionItemsCard from "../components/results/ActionItemsCard";

import ChatBox from "../components/chat/ChatBox";

import { toast } from "react-toastify";
import { downloadReport } from "../pdf/downloadReport.jsx";
import FlashcardsSection from "../components/flashcards/FlashcardsSection";
import QuizSection from "../components/quiz/QuizSection";

function DocumentDetails() {

    const { id } = useParams();

    const [document, setDocument] = useState(null);

    const [loading, setLoading] = useState(true);

    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {

        fetchDocument();

    }, []);

    const fetchDocument = async () => {

        try {

            const data = await getDocument(id);

            setDocument(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load document.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleReanalyze = async () => {

        try {

            setAnalyzing(true);

            await reanalyzeDocument(id);

            await fetchDocument();

            toast.success("Analysis completed successfully!");

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to analyze document.");

        }

        finally {

            setAnalyzing(false);

        }

    };

    const handleDownloadPDF = async () => {

        try {

            await downloadReport({

                filename: document.filename,

                summary: document.summary,

                keyPoints: document.key_points,

                actionItems: document.action_items,

            });

            toast.success("PDF downloaded successfully!");

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to generate PDF.");

        }

    };

    if (loading) {

        return (

            <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">

                <div className="text-center">

                    <div className="text-7xl animate-pulse">

                        🤖

                    </div>

                    <h2 className="mt-6 text-4xl font-bold text-cyan-400">

                        Loading Workspace...

                    </h2>

                    <p className="mt-3 text-gray-500">

                        Preparing your AI workspace...

                    </p>

                </div>

            </section>

        );

    }

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

        <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6 py-20">

            <div className="mx-auto max-w-7xl">

                {/* Hero */}

                <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 shadow-2xl backdrop-blur">

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex items-start gap-6">

                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-cyan-500/10 text-6xl">

                                {getIcon()}

                            </div>

                            <div>

                                <h1 className="break-all text-4xl font-extrabold">

                                    {document.filename}

                                </h1>

                                <p className="mt-3 text-gray-400">

                                    {extension.toUpperCase()} •{" "}

                                    {new Date(
                                        document.uploaded_at
                                    ).toLocaleString()}

                                </p>

                                <div className="mt-5">

                                    {hasAnalysis ? (

                                        <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">

                                            🟢 AI Analysis Ready

                                        </span>

                                    ) : (

                                        <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">

                                            🟡 Needs Analysis

                                        </span>

                                    )}

                                </div>

                            </div>

                        </div>

                        {hasAnalysis && (

                            <div className="flex flex-wrap gap-3">

                                <button
                                    className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-500/20"
                                >
                                    📋 Copy All
                                </button>

                                <button
                                    onClick={handleDownloadPDF}
                                    className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-6 py-3 font-semibold text-violet-300 transition duration-300 hover:scale-105 hover:bg-violet-500/20"
                                >
                                    📥 Download PDF
                                </button>

                            </div>

                        )}

                    </div>

                </div>

                {!hasAnalysis ? (

                    <div className="mt-12 rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-12 text-center">

                        <div className="text-8xl">

                            ⚠️

                        </div>

                        <h2 className="mt-6 text-4xl font-bold">

                            AI Analysis Required

                        </h2>

                        <p className="mt-5 text-lg text-gray-400">

                            This document was uploaded before AI analysis
                            was available.

                        </p>

                        <button
                            onClick={handleReanalyze}
                            disabled={analyzing}
                            className="mt-10 rounded-2xl bg-cyan-500 px-10 py-4 text-lg font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {analyzing
                                ? "🤖 Analyzing..."
                                : "🚀 Analyze Document"}

                        </button>

                    </div>

                ) : (

                    <>

                        {/* Results */}

                        <div className="mt-12 grid gap-8">

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

                        {/* Chat */}

                        <div className="mt-14">

                            <div className="mb-6">

                                <h2 className="text-3xl font-bold">

                                    💬 AI Assistant

                                </h2>

                                <p className="mt-2 text-gray-400">

                                    Ask questions about this document and let
                                    NightBat AI answer using its contents.

                                </p>

                            </div>

                            <ChatBox documentId={id} />

                            <FlashcardsSection
                                documentId={document.id}
                            />

                            <QuizSection
                                documentId={document.id}
                            />

                        </div>

                    </>

                )}

            </div>

        </section>

    );

}

export default DocumentDetails;