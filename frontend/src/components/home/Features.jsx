import FeatureCard from "./FeatureCard";

import {
    FileText,
    Bot,
    MessageCircle,
    Brain,
    ClipboardCheck,
    Download,
    ShieldCheck,
    Zap,
} from "lucide-react";

const features = [
    {
        Icon: FileText,
        title: "Upload Documents",
        description:
            "Upload PDF, DOCX and TXT documents securely in seconds.",
    },
    {
        Icon: Bot,
        title: "AI Summary",
        description:
            "Generate concise summaries, key insights and action items instantly.",
    },
    {
        Icon: MessageCircle,
        title: "AI Chat",
        description:
            "Ask questions about your documents and receive intelligent AI answers.",
    },
    {
        Icon: Brain,
        title: "Flashcards",
        description:
            "Automatically generate flashcards for quick revision and better retention.",
    },
    {
        Icon: ClipboardCheck,
        title: "AI Quiz",
        description:
            "Test your understanding with AI-generated quizzes and detailed results.",
    },
    {
        Icon: Download,
        title: "PDF Reports",
        description:
            "Download professional reports containing summaries, key points and action items.",
    },
    {
        Icon: ShieldCheck,
        title: "Secure Workspace",
        description:
            "Your documents remain private and are accessible only to your account.",
    },
    {
        Icon: Zap,
        title: "Lightning Fast",
        description:
            "Powered by Groq for blazing-fast AI responses and smooth performance.",
    },
];

function Features() {
    return (
        <section
            id="features"
            className="bg-gray-950 py-24"
        >
            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <h2 className="text-5xl font-bold">
                        Why Choose NightBat AI?
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-400">
                        Everything you need to analyze, understand, learn and
                        interact with documents using the power of AI.
                    </p>

                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

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