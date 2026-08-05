import { useEffect, useState } from "react";

import {
    getQuizAttempts,
} from "../../services/quizService";

function QuizHistory({

    documentId,

    refreshKey,

}) {

    const [attempts, setAttempts] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    // ==========================
    // Load Previous Attempts
    // ==========================

    useEffect(() => {

        if (!documentId) return;

        loadAttempts();

    }, [documentId, refreshKey]);

    const loadAttempts = async () => {

        try {

            setLoading(true);

            const response =
                await getQuizAttempts(
                    documentId
                );

            setAttempts(
                response?.attempts || []
            );

        }

        catch (error) {

            console.error(
                "Failed to load quiz attempts:",
                error
            );

            setAttempts([]);

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return (

            <div
                className="
                    mt-12

                    rounded-3xl

                    border
                    border-slate-200

                    bg-white

                    p-6
                    sm:p-8

                    text-center

                    dark:border-white/10
                    dark:bg-[#18181b]
                "
            >

                <p
                    className="
                        text-slate-500

                        dark:text-zinc-400
                    "
                >

                    Loading previous attempts...

                </p>

            </div>

        );

    }

    // ==========================
    // No Attempts
    // ==========================

    if (attempts.length === 0) {

        return null;

    }

    return (

        <section
            aria-label="Previous Quiz Attempts"
            className="
                mt-12

                rounded-3xl

                border
                border-slate-200

                bg-white

                p-5
                sm:p-8

                shadow-xl
                shadow-slate-200/50

                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none
            "
        >

            {/* Heading */}

            <h2
                className="
                    mb-6

                    text-2xl
                    sm:text-3xl

                    font-bold

                    text-slate-950

                    dark:text-white
                "
            >

                📊 Previous Attempts

            </h2>

            {/* Attempts */}

            <div className="space-y-4">

                {attempts.map((attempt) => {

                    const minutes =
                        Math.floor(
                            (attempt.time_taken || 0) / 60
                        );

                    const seconds =
                        (attempt.time_taken || 0) % 60;

                    return (

                        <div
                            key={attempt.id}
                            className="
                                flex
                                flex-col

                                gap-5

                                rounded-xl

                                border
                                border-slate-200

                                bg-slate-50

                                p-5

                                transition-all
                                duration-300

                                hover:-translate-y-0.5
                                hover:border-cyan-300
                                hover:shadow-md

                                sm:flex-row
                                sm:items-center
                                sm:justify-between

                                dark:border-white/10
                                dark:bg-[#111113]

                                dark:hover:border-cyan-500/30
                                dark:hover:shadow-none
                            "
                        >

                            {/* Score */}

                            <div>

                                <p
                                    className="
                                        text-2xl
                                        sm:text-3xl

                                        font-bold

                                        text-slate-950

                                        dark:text-white
                                    "
                                >

                                    {attempt.score}%

                                </p>

                                <p
                                    className="
                                        mt-2

                                        flex
                                        flex-wrap

                                        gap-2

                                        text-sm
                                        sm:text-base
                                    "
                                >

                                    <span
                                        className="
                                            font-medium
                                            text-green-600

                                            dark:text-green-400
                                        "
                                    >

                                        {attempt.correct} Correct

                                    </span>

                                    <span
                                        className="
                                            font-medium
                                            text-red-600

                                            dark:text-red-400
                                        "
                                    >

                                        {attempt.wrong} Wrong

                                    </span>

                                    <span
                                        className="
                                            font-medium
                                            text-yellow-600

                                            dark:text-yellow-400
                                        "
                                    >

                                        {attempt.skipped} Skipped

                                    </span>

                                </p>

                            </div>

                            {/* Time & Date */}

                            <div
                                className="
                                    sm:text-right
                                "
                            >

                                <p
                                    className="
                                        text-base
                                        sm:text-lg

                                        font-semibold

                                        text-cyan-600

                                        dark:text-cyan-300
                                    "
                                >

                                    ⏱ {minutes}:
                                    {String(seconds).padStart(2, "0")}

                                </p>

                                <p
                                    className="
                                        mt-1

                                        break-words

                                        text-xs
                                        sm:text-sm

                                        text-slate-500

                                        dark:text-zinc-500
                                    "
                                >

                                    {attempt.created_at
                                        ? new Date(
                                            attempt.created_at
                                        ).toLocaleString()
                                        : "-"}

                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>

        </section>

    );

}

export default QuizHistory;