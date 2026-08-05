import { useEffect, useMemo, useState } from "react";

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

            setSecondsLeft((prev) => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [secondsLeft, onTimeUp]);

    // ==========================
    // Time Formatting
    // ==========================

    const formattedTime = useMemo(() => {

        const minutes =
            Math.floor(secondsLeft / 60);

        const seconds =
            secondsLeft % 60;

        return `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;

    }, [secondsLeft]);

    // ==========================
    // Progress
    // ==========================

    const percentage =
        (secondsLeft / totalSeconds) * 100;

    const isWarning =
        secondsLeft <= 120;

    const isDanger =
        secondsLeft <= 60;

    const barColor = isDanger
        ? "bg-red-500"
        : isWarning
            ? "bg-yellow-500"
            : "bg-cyan-500";

    const textColor = isDanger
        ? "text-red-600 dark:text-red-400"
        : isWarning
            ? "text-yellow-600 dark:text-yellow-400"
            : "text-cyan-700 dark:text-cyan-300";

    return (

        <div
            className="
                mb-6
                sm:mb-8

                flex
                justify-center
            "
        >

            <div
                className="
                    w-full
                    max-w-md

                    rounded-2xl

                    border
                    border-slate-200

                    bg-white

                    p-4

                    shadow-sm

                    transition-colors
                    duration-300

                    dark:border-white/10
                    dark:bg-zinc-900
                    dark:shadow-none
                "
            >

                {/* Header */}

                <div
                    className="
                        mb-3

                        flex
                        items-center
                        justify-between
                    "
                >

                    <span
                        className="
                            text-sm
                            font-medium

                            text-slate-600

                            dark:text-zinc-400
                        "
                    >
                        Time Remaining
                    </span>

                    <span
                        role="timer"
                        aria-live="polite"
                        className={`
                            text-lg
                            sm:text-xl

                            font-bold

                            transition-colors
                            duration-300

                            ${textColor}
                        `}
                    >
                        ⏳ {formattedTime}
                    </span>

                </div>

                {/* Progress Bar */}

                <div
                    className="
                        h-2.5

                        overflow-hidden

                        rounded-full

                        bg-slate-200

                        dark:bg-zinc-700
                    "
                >

                    <div
                        className={`
                            h-full

                            rounded-full

                            transition-all
                            duration-1000
                            ease-linear

                            ${barColor}
                        `}
                        style={{
                            width: `${percentage}%`,
                        }}
                    />

                </div>

            </div>

        </div>

    );

}

export default QuizTimer;