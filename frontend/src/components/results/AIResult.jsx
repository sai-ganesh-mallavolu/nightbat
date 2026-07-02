import ReactMarkdown from "react-markdown";

function AIResult({ summary }) {

    if (!summary) return null;

    return (
        <div className="mt-12 rounded-2xl border border-cyan-500/20 bg-white/5 p-8 shadow-xl">

            <h2 className="mb-8 text-3xl font-bold text-cyan-400">
                🤖 AI Analysis
            </h2>

            <div className="prose prose-invert max-w-none">

                <ReactMarkdown
                    components={{
                        h2: ({ children }) => (
                            <h2 className="mt-8 mb-4 border-b border-cyan-500/30 pb-2 text-2xl font-bold text-cyan-300">
                                {children}
                            </h2>
                        ),

                        ul: ({ children }) => (
                            <ul className="ml-6 list-disc space-y-2">
                                {children}
                            </ul>
                        ),

                        p: ({ children }) => (
                            <p className="leading-8 text-gray-300">
                                {children}
                            </p>
                        ),
                    }}
                >
                    {summary}
                </ReactMarkdown>

            </div>

        </div>
    );
}

export default AIResult;