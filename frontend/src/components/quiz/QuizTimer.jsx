import { useEffect, useState } from "react";


function QuizTimer({

    totalSeconds = 600,

    onTimeUp,

    onTick,

}) {

    const [secondsLeft, setSecondsLeft] =
        useState(totalSeconds);


    // ==========================
    // Reset Timer
    // ==========================

    useEffect(() => {

        setSecondsLeft(totalSeconds);

    }, [totalSeconds]);


    // ==========================
    // Send Remaining Time
    // To Parent
    // ==========================

    useEffect(() => {

        onTick?.(secondsLeft);

    }, [secondsLeft, onTick]);


    // ==========================
    // Countdown
    // ==========================

    useEffect(() => {

        if (secondsLeft <= 0) {

            onTimeUp?.();

            return;

        }


        const timer = setTimeout(() => {

            setSecondsLeft(
                (prev) => prev - 1
            );

        }, 1000);


        return () =>
            clearTimeout(timer);

    }, [secondsLeft, onTimeUp]);


    // ==========================
    // Format Time
    // ==========================

    const minutes =
        Math.floor(secondsLeft / 60);


    const seconds =
        secondsLeft % 60;


    return (

        <div
            className="
                mb-8
                flex
                items-center
                justify-center
            "
        >

            <div
                className="
                    rounded-full
                    border
                    border-red-200
                    bg-red-50
                    px-6
                    py-3
                    shadow-sm
                    transition-colors
                    duration-300

                    dark:border-red-500/20
                    dark:bg-red-500/10
                    dark:shadow-none
                "
            >

                <span
                    className="
                        text-lg
                        font-semibold
                        text-red-600

                        dark:text-red-300
                    "
                >

                    ⏳ {minutes}:
                    {seconds
                        .toString()
                        .padStart(2, "0")}

                </span>

            </div>

        </div>

    );

}

export default QuizTimer;