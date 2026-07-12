import ReactMarkdown from "react-markdown";


function AIResult({ summary }) {

    if (!summary) return null;


    return (

        <div
            className="
                mt-12
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-8
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
                    mb-8
                    text-3xl
                    font-bold
                    text-cyan-600

                    dark:text-cyan-400
                "
            >

                🤖 AI Analysis

            </h2>


            {/* Markdown Content */}

            <div className="max-w-none">

                <ReactMarkdown

                    components={{

                        h1: ({ children }) => (

                            <h1
                                className="
                                    mt-10
                                    mb-5
                                    text-3xl
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
                                    border-b
                                    border-cyan-200
                                    pb-2
                                    text-2xl
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
                                    text-xl
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
                                    leading-8
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
                                    ml-6
                                    list-disc
                                    space-y-2
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
                                    ml-6
                                    list-decimal
                                    space-y-2
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

                            <li className="leading-7">

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
                                    px-5
                                    py-3
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
                                    rounded
                                    bg-slate-100
                                    px-1.5
                                    py-0.5
                                    text-sm
                                    text-cyan-700

                                    dark:bg-zinc-800
                                    dark:text-cyan-300
                                "
                            >

                                {children}

                            </code>

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