import FeatureCard from "./FeatureCard";

import {
    FileText,
    Bot,
    MessageCircle,
    Zap,
} from "lucide-react";

const features = [
    {
        Icon: FileText,
        title: "Upload Documents",
        description: "Upload PDF, DOCX and TXT documents securely in seconds.",
    },
    {
        Icon: Bot,
        title: "AI Analysis",
        description: "Generate summaries, key insights and action items instantly.",
    },
    {
        Icon: MessageCircle,
        title: "Ask Questions",
        description: "Chat with your documents using natural language.",
    },
    {
        Icon: Zap,
        title: "Lightning Fast",
        description: "Powered by Groq for extremely fast AI responses.",
    },
];

function Features() {
    return (
        <section className="bg-gray-950 py-24">
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="mb-5 text-center text-5xl font-bold">
                    Powerful Features
                </h2>

                <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
                    Everything you need to understand any document with AI.
                </p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            Icon={feature.Icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;