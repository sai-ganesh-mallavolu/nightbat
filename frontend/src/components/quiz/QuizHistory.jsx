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


    // ==========================
    // Load Previous Attempts
    // ==========================

    useEffect(() => {

        loadAttempts();

    }, [documentId, refreshKey]);


    const loadAttempts = async () => {

        try {

            const response =
                await getQuizAttempts(
                    documentId
                );


            setAttempts(
                response.attempts || []
            );

        }

        catch (error) {

            console.error(
                "Failed to load quiz attempts:",
                error
            );

        }

    };


    // ==========================
    // No Attempts
    // ==========================

    if (attempts.length === 0) {

        return null;

    }


    return (

        <div
            className="
                mt-12
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
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
                    text-3xl
                    font-bold
                    text-slate-950

                    dark:text-white
                "
            >

                📊 Previous Attempts

            </h2>


            {/* Attempts */}

            <div className="space-y-4">

                {attempts.map((attempt) => (

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


                        {/* Score Information */}

                        <div>

                            <p
                                className="
                                    text-2xl
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
                                    text-slate-600

                                    dark:text-zinc-400
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

                                {" · "}

                                <span
                                    className="
                                        font-medium
                                        text-red-600

                                        dark:text-red-400
                                    "
                                >

                                    {attempt.wrong} Wrong

                                </span>

                                {" · "}

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


                        {/* Time and Date */}

                        <div
                            className="
                                sm:text-right
                            "
                        >

                            <p
                                className="
                                    text-lg
                                    font-semibold
                                    text-cyan-600

                                    dark:text-cyan-300
                                "
                            >

                                ⏱{" "}

                                {Math.floor(
                                    attempt.time_taken / 60
                                )}

                                :

                                {String(
                                    attempt.time_taken % 60
                                ).padStart(2, "0")}

                            </p>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-slate-500

                                    dark:text-zinc-500
                                "
                            >

                                {new Date(
                                    attempt.created_at
                                ).toLocaleString()}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default QuizHistory;