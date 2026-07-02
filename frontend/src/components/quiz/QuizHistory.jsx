import { useEffect, useState } from "react";

import {

    getQuizAttempts,

} from "../../services/quizService";

function QuizHistory({

    documentId,

}) {

    const [attempts, setAttempts] = useState([]);

    useEffect(() => {

        loadAttempts();

    }, []);

    const loadAttempts = async () => {

        const response = await getQuizAttempts(

            documentId

        );

        setAttempts(

            response.attempts

        );

    };

    if (

        attempts.length === 0

    )

        return null;

    return (

        <div className="mt-12 rounded-3xl border border-cyan-500/20 bg-white/5 p-8">

            <h2 className="mb-6 text-3xl font-bold text-white">

                📊 Previous Attempts

            </h2>

            <div className="space-y-4">

                {

                    attempts.map((attempt) => (

                        <div

                            key={attempt.id}

                            className="flex items-center justify-between rounded-xl bg-slate-800 p-5"

                        >

                            <div>

                                <p className="font-semibold text-white">

                                    {attempt.score}%

                                </p>

                                <p className="text-gray-400">

                                    {attempt.correct} Correct ·{" "}

                                    {attempt.wrong} Wrong ·{" "}

                                    {attempt.skipped} Skipped

                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-cyan-300">

                                    {Math.floor(

                                        attempt.time_taken / 60

                                    )}

                                    :

                                    {String(

                                        attempt.time_taken % 60

                                    ).padStart(2, "0")}

                                </p>

                                <p className="text-sm text-gray-500">

                                    {

                                        new Date(

                                            attempt.created_at

                                        ).toLocaleString()

                                    }

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default QuizHistory;