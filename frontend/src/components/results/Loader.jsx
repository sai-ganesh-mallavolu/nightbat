import { useEffect, useState } from "react";

const steps = [
    "🔐 Securing your document...",
    "📄 Extracting document content...",
    "🧠 Understanding context with AI...",
    "🔎 Finding key insights...",
    "📝 Preparing intelligent summary...",
    "💡 Generating action items...",
    "✨ Finalizing analysis..."
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

        <div className="mt-12 rounded-2xl border border-cyan-500/20 bg-white/5 p-8 shadow-xl">

            <div className="mb-6 text-center">

                <div className="text-5xl">
                    🤖
                </div>

                <h2 className="mt-3 text-3xl font-bold text-cyan-400">
                    NightBat AI
                </h2>

                <p className="mt-2 text-gray-400">
                    Please wait while your document is being analyzed...
                </p>

            </div>

            <div className="space-y-4">

                {steps.map((step, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-3"
                    >

                        {index < currentStep && (
                            <span className="text-green-400 text-xl">
                                ✅
                            </span>
                        )}

                        {index === currentStep && (
                            <span className="text-cyan-400 animate-pulse text-xl">
                                ⏳
                            </span>
                        )}

                        {index > currentStep && (
                            <span className="text-gray-600 text-xl">
                                ⬜
                            </span>
                        )}

                        <span
                            className={`${index <= currentStep
                                    ? "text-white"
                                    : "text-gray-500"
                                }`}
                        >
                            {step}
                        </span>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Loader;