import { useEffect, useState } from "react";

function QuizTimer({

    totalSeconds = 600,

    onTimeUp,

    onTick,

}) {

    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

    // Reset timer when totalSeconds changes
    useEffect(() => {

        setSecondsLeft(totalSeconds);

    }, [totalSeconds]);

    // Send remaining time to parent
    useEffect(() => {

        onTick?.(secondsLeft);

    }, [secondsLeft, onTick]);

    // Countdown
    useEffect(() => {

        if (secondsLeft <= 0) {

            onTimeUp?.();

            return;

        }

        const timer = setTimeout(() => {

            setSecondsLeft((prev) => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [secondsLeft, onTimeUp]);

    const minutes = Math.floor(secondsLeft / 60);

    const seconds = secondsLeft % 60;

    return (

        <div className="mb-8 flex items-center justify-center">

            <div className="rounded-full border border-red-500/30 bg-red-500/10 px-6 py-3">

                <span className="text-lg font-semibold text-red-300">

                    ⏳ {minutes}:{seconds.toString().padStart(2, "0")}

                </span>

            </div>

        </div>

    );

}

export default QuizTimer;