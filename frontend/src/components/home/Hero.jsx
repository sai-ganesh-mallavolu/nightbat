import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-6">
            {/* Background Blur */}
            <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>

            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

                <span className="mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-base font-medium text-cyan-300">
                    🚀 AI Powered Document Intelligence
                </span>

                <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
                    Analyze Any
                    <span className="text-cyan-400"> Document </span>
                    with AI
                </h1>

                <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300">
                    Upload PDFs, DOCX or TXT files and instantly generate
                    summaries, key insights, action items and intelligent answers.
                </p>

                <div className="mt-10 flex gap-5">

                    <Link
                        to="/upload"
                        className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
                    >
                        Upload Document
                    </Link>

                    <button className="rounded-xl border border-white/20 px-8 py-4 transition-all duration-300 hover:scale-105 hover:bg-white/10">
                        Learn More
                    </button>

                </div>

            </div>
        </section>
    );
}

export default Hero;