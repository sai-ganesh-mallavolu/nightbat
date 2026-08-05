import { Link } from "react-router-dom";

function NotFound() {

    return (

        <section
            className="
                flex
                min-h-screen
                items-center
                justify-center

                bg-gradient-to-br
                from-white
                via-slate-50
                to-slate-100

                px-4
                sm:px-6
                lg:px-8

                py-10
                sm:py-12

                transition-colors
                duration-300

                dark:from-[#09090b]
                dark:via-[#0c0c0f]
                dark:to-[#111113]
            "
        >

            <div
                className="
                    w-full
                    max-w-xl

                    rounded-2xl
                    sm:rounded-3xl

                    border
                    border-slate-200

                    bg-white

                    p-8
                    sm:p-10
                    lg:p-12

                    text-center

                    shadow-xl
                    shadow-slate-200/60

                    transition-colors
                    duration-300

                    dark:border-white/10
                    dark:bg-[#18181b]
                    dark:shadow-2xl
                    dark:shadow-black/30
                "
            >

                {/* Icon */}

                <div
                    className="
                        text-6xl
                        sm:text-7xl
                    "
                >
                    🦇
                </div>

                {/* Error Code */}

                <h1
                    className="
                        mt-6

                        text-6xl
                        sm:text-7xl

                        font-black

                        text-cyan-500
                    "
                >
                    404
                </h1>

                {/* Heading */}

                <h2
                    className="
                        mt-4

                        text-2xl
                        sm:text-3xl

                        font-bold

                        text-slate-900

                        dark:text-white
                    "
                >
                    Page Not Found
                </h2>

                {/* Description */}

                <p
                    className="
                        mt-4

                        text-sm
                        sm:text-base

                        leading-7

                        text-slate-600

                        dark:text-zinc-400
                    "
                >
                    Sorry, the page you are looking for doesn't exist or has
                    been moved.
                </p>

                {/* Button */}

                <Link
                    to="/"
                    className="
                        mt-8

                        inline-flex
                        items-center
                        justify-center

                        rounded-xl

                        bg-cyan-500

                        px-6
                        py-3

                        text-sm
                        sm:text-base

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

                        focus:outline-none
                        focus:ring-2
                        focus:ring-cyan-500
                        focus:ring-offset-2

                        dark:focus:ring-cyan-400
                        dark:focus:ring-offset-[#09090b]
                    "
                >
                    ← Back to Home
                </Link>

            </div>

        </section>

    );

}

export default NotFound;