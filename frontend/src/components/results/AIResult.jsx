import ReactMarkdown from "react-markdown";

function AIResult({ summary }) {

    if (!summary) return null;

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

                p-5
                sm:p-6
                lg:p-8

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
                    sm:mb-8

                    text-2xl
                    sm:text-3xl

                    font-bold

                    text-cyan-600

                    dark:text-cyan-400
                "
            >
                🤖 AI Analysis
            </h2>

            {/* Markdown Content */}

            <div className="max-w-none overflow-hidden">

                <ReactMarkdown

                    components={{

                        h1: ({ children }) => (

                            <h1
                                className="
                                    mt-8
                                    mb-4

                                    break-words

                                    text-2xl
                                    sm:text-3xl

                                    font-bold

                                    text-slate-950

                                    dark:text-white
                                "
                            >
                                {children}
                            </h1>

                        ),

                        h2: ({ children }) => (

                            <h2
                                className="
                                    mt-8
                                    mb-4

                                    break-words

                                    border-b
                                    border-cyan-200

                                    pb-2

                                    text-xl
                                    sm:text-2xl

                                    font-bold

                                    text-cyan-700

                                    dark:border-cyan-500/30
                                    dark:text-cyan-300
                                "
                            >
                                {children}
                            </h2>

                        ),

                        h3: ({ children }) => (

                            <h3
                                className="
                                    mt-6
                                    mb-3

                                    break-words

                                    text-lg
                                    sm:text-xl

                                    font-bold

                                    text-slate-900

                                    dark:text-zinc-100
                                "
                            >
                                {children}
                            </h3>

                        ),

                        p: ({ children }) => (

                            <p
                                className="
                                    my-4

                                    break-words

                                    text-sm
                                    sm:text-base

                                    leading-7
                                    sm:leading-8

                                    text-slate-700

                                    dark:text-zinc-300
                                "
                            >
                                {children}
                            </p>

                        ),

                        ul: ({ children }) => (

                            <ul
                                className="
                                    my-5

                                    ml-5
                                    sm:ml-6

                                    list-disc

                                    space-y-2

                                    text-sm
                                    sm:text-base

                                    text-slate-700

                                    marker:text-cyan-600

                                    dark:text-zinc-300
                                    dark:marker:text-cyan-400
                                "
                            >
                                {children}
                            </ul>

                        ),

                        ol: ({ children }) => (

                            <ol
                                className="
                                    my-5

                                    ml-5
                                    sm:ml-6

                                    list-decimal

                                    space-y-2

                                    text-sm
                                    sm:text-base

                                    text-slate-700

                                    marker:font-semibold
                                    marker:text-cyan-600

                                    dark:text-zinc-300
                                    dark:marker:text-cyan-400
                                "
                            >
                                {children}
                            </ol>

                        ),

                        li: ({ children }) => (

                            <li
                                className="
                                    break-words

                                    leading-7
                                    sm:leading-8
                                "
                            >
                                {children}
                            </li>

                        ),

                        strong: ({ children }) => (

                            <strong
                                className="
                                    font-bold

                                    text-slate-950

                                    dark:text-white
                                "
                            >
                                {children}
                            </strong>

                        ),

                        blockquote: ({ children }) => (

                            <blockquote
                                className="
                                    my-6

                                    rounded-r-xl

                                    border-l-4
                                    border-cyan-500

                                    bg-cyan-50

                                    px-4
                                    sm:px-5

                                    py-3

                                    text-sm
                                    sm:text-base

                                    break-words

                                    text-slate-700

                                    dark:bg-cyan-500/10
                                    dark:text-zinc-300
                                "
                            >
                                {children}
                            </blockquote>

                        ),

                        code: ({ children }) => (

                            <code
                                className="
                                    break-words

                                    rounded

                                    bg-slate-100

                                    px-1.5
                                    py-0.5

                                    text-xs
                                    sm:text-sm

                                    text-cyan-700

                                    dark:bg-zinc-800
                                    dark:text-cyan-300
                                "
                            >
                                {children}
                            </code>

                        ),

                        pre: ({ children }) => (

                            <pre
                                className="
                                    my-5

                                    overflow-x-auto

                                    rounded-xl

                                    bg-slate-100

                                    p-4

                                    text-sm

                                    dark:bg-zinc-900
                                "
                            >
                                {children}
                            </pre>

                        ),

                        hr: () => (

                            <hr
                                className="
                                    my-8

                                    border-slate-200

                                    dark:border-white/10
                                "
                            />

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