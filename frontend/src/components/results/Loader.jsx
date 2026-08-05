import { useEffect, useState } from "react";

const steps = [
    "🔐 Securing your document...",
    "📄 Extracting document content...",
    "🧠 Understanding context with AI...",
    "🔎 Finding key insights...",
    "📝 Preparing intelligent summary...",
    "💡 Generating action items...",
    "✨ Finalizing analysis...",
];

function Loader() {

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentStep((prev) => {

                if (prev < steps.length - 1) {
                    return prev + 1;
                }

                return prev;

            });

        }, 800);

        return () => clearInterval(interval);

    }, []);

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

                p-6
                sm:p-8

                shadow-lg
                shadow-slate-200/50

                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none
            "
        >

            {/* Header */}

            <div className="mb-8 text-center">

                <div
                    className="
                        text-5xl
                        sm:text-6xl

                        animate-bounce
                    "
                >
                    🤖
                </div>

                <h2
                    className="
                        mt-3

                        text-2xl
                        sm:text-3xl

                        font-bold

                        text-cyan-600

                        dark:text-cyan-400
                    "
                >
                    NightBat AI
                </h2>

                <p
                    className="
                        mt-2

                        text-sm
                        sm:text-base

                        leading-7

                        text-slate-600

                        dark:text-zinc-400
                    "
                >
                    Please wait while your document is being analyzed...
                </p>

            </div>

            {/* Progress Bar */}

            <div
                className="
                    mb-8

                    h-2

                    overflow-hidden

                    rounded-full

                    bg-slate-200

                    dark:bg-white/10
                "
            >

                <div
                    className="

                        h-full

                        rounded-full

                        bg-cyan-500

                        transition-all
                        duration-500

                        dark:bg-cyan-400
                    "
                    style={{
                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                    }}
                />

            </div>

            {/* Analysis Steps */}

            <div className="space-y-3 sm:space-y-4">

                {steps.map((step, index) => {

                    const isCompleted = index < currentStep;

                    const isCurrent = index === currentStep;

                    const isPending = index > currentStep;

                    return (

                        <div
                            key={index}
                            className={`
                                flex
                                items-center

                                gap-3

                                rounded-xl

                                px-3
                                sm:px-4

                                py-3

                                transition-all
                                duration-300

                                ${isCurrent
                                    ? "bg-cyan-50 dark:bg-cyan-500/10"
                                    : ""
                                }
                            `}
                        >

                            {/* Step Icon */}

                            {isCompleted && (

                                <span
                                    className="
                                        text-lg
                                        sm:text-xl

                                        text-green-600

                                        dark:text-green-400
                                    "
                                >
                                    ✅
                                </span>

                            )}

                            {isCurrent && (

                                <span
                                    className="
                                        animate-pulse

                                        text-lg
                                        sm:text-xl

                                        text-cyan-600

                                        dark:text-cyan-400
                                    "
                                >
                                    ⏳
                                </span>

                            )}

                            {isPending && (

                                <span
                                    className="
                                        text-lg
                                        sm:text-xl

                                        text-slate-300

                                        dark:text-zinc-600
                                    "
                                >
                                    ⬜
                                </span>

                            )}

                            {/* Step Text */}

                            <span
                                className={`
                                    flex-1

                                    break-words

                                    text-sm
                                    sm:text-base

                                    transition-colors
                                    duration-300

                                    ${isCompleted
                                        ? "font-medium text-slate-700 dark:text-zinc-300"
                                        : ""
                                    }

                                    ${isCurrent
                                        ? "font-semibold text-slate-950 dark:text-white"
                                        : ""
                                    }

                                    ${isPending
                                        ? "text-slate-400 dark:text-zinc-500"
                                        : ""
                                    }
                                `}
                            >
                                {step}
                            </span>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}

export default Loader;