import { Link } from "react-router-dom";

function Hero() {

    return (

        <section
            className="
                relative
                flex min-h-screen
                items-center justify-center
                overflow-hidden
                bg-gradient-to-b
                from-white
                via-slate-50
                to-slate-100
                px-4
                sm:px-6
                lg:px-8
                text-slate-900
                transition-colors
                duration-300

                dark:from-[#09090b]
                dark:via-[#0c0c0f]
                dark:to-[#111113]
                dark:text-white
            "
        >

            {/* Subtle Background Pattern */}

            <div
                className="
                    pointer-events-none
                    absolute inset-0
                    opacity-[0.035]

                    dark:opacity-[0.05]
                "
                style={{
                    backgroundImage:
                        "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />


            {/* Hero Content */}

            <div
                className="
                    relative z-10
                    mx-auto
                    flex max-w-7xl
                    flex-col items-center
                    px-4
                    sm:px-6
                    lg:px-8
                    text-center
                "
            >

                {/* Badge */}

                <span
                    className="
                        mb-6
                        rounded-full
                        border border-cyan-200
                        bg-white/80
                        px-4
                        sm:px-6

                        py-2
                        sm:py-3

                        text-sm
                        sm:text-base
                        font-medium
                        text-cyan-700
                        shadow-sm
                        backdrop-blur-sm
                        transition-colors
                        duration-300

                        dark:border-cyan-400/20
                        dark:bg-white/5
                        dark:text-cyan-300
                        dark:shadow-none
                    "
                >
                    🚀 AI Powered Document Intelligence
                </span>


                {/* Heading */}

                <h1
                    className="
                        max-w-5xl
                        text-4xl
                        sm:text-5xl
                        lg:text-7xl
                        font-extrabold
                        leading-tight
                        tracking-tight
                        text-slate-950

                        

                        dark:text-white
                    "
                >

                    Analyze Any

                    <span className="text-cyan-500 dark:text-cyan-400">
                        {" "}Document{" "}
                    </span>

                    with AI

                </h1>


                {/* Description */}

                <p
                    className="
                        mt-8
                        max-w-2xl
                        px-2

                        text-base
                        sm:text-lg

                        leading-7
                        sm:leading-8
                        text-slate-600

                        dark:text-zinc-400
                    "
                >
                    Upload PDFs, DOCX or TXT files and instantly generate
                    summaries, key insights, action items and intelligent answers.
                </p>


                {/* Buttons */}

                <div className="
                    mt-10

                    flex
                    w-full

                    flex-col

                    gap-3

                    sm:w-auto
                    sm:flex-row
                    sm:flex-wrap
                    sm:justify-center
                    sm:gap-4
                ">

                    {/* Primary Button */}

                    <Link
                        to="/upload"
                        className="
                            rounded-xl
                            bg-cyan-500
                            w-full
                            sm:w-auto

                            px-6
                            sm:px-8

                            py-3
                            sm:py-4

                            text-sm
                            sm:text-base

                            text-center
                            font-semibold
                            text-slate-950
                            shadow-lg
                            shadow-cyan-500/20
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-cyan-400
                            hover:shadow-xl
                            hover:shadow-cyan-500/25
                        "
                    >
                        Upload Document
                    </Link>


                    {/* Secondary Button */}

                    <button
                        onClick={() =>
                            document
                                .getElementById("features")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                })
                        }
                        className="
                            rounded-xl
                            border border-slate-300
                            bg-white
                            w-full
                            sm:w-auto

                            px-6
                            sm:px-8

                            py-3
                            sm:py-4

                            text-sm
                            sm:text-base

                            text-center
                            font-semibold
                            text-slate-700
                            shadow-sm
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:border-cyan-400
                            hover:text-cyan-600

                            dark:border-white/15
                            dark:bg-white/5
                            dark:text-zinc-200
                            dark:hover:border-cyan-400
                            dark:hover:bg-cyan-400/10
                            dark:hover:text-cyan-300
                        "
                    >
                        Learn More
                    </button>

                </div>

            </div>

        </section>

    );

}

export default Hero;