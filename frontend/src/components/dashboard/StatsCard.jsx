function StatsCard({
    icon,
    title,
    value,
    color,
}) {

    return (

        <div
            className="
                group
                overflow-hidden

                rounded-2xl
                sm:rounded-3xl

                border
                border-slate-200

                bg-white

                p-5
                sm:p-6

                shadow-md
                shadow-slate-200/60

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-cyan-400
                hover:shadow-xl
                hover:shadow-cyan-500/10

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none

                dark:hover:border-cyan-400/30
                dark:hover:bg-[#1f1f23]
                dark:hover:shadow-lg
                dark:hover:shadow-cyan-500/10
            "
        >

            <div className="flex items-start justify-between gap-4">

                {/* Stats Information */}

                <div className="min-w-0">

                    <p
                        className="
                            text-xs
                            sm:text-sm

                            font-medium
                            uppercase
                            tracking-widest

                            text-slate-500

                            dark:text-zinc-400
                        "
                    >
                        {title}
                    </p>

                    <h2
                        className={`
                            mt-3
                            sm:mt-4

                            break-words

                            text-3xl
                            sm:text-4xl
                            lg:text-5xl

                            font-bold

                            ${color}
                        `}
                    >
                        {value}
                    </h2>

                </div>

                {/* Icon */}

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-center

                        rounded-xl
                        sm:rounded-2xl

                        bg-slate-100

                        p-3
                        sm:p-4

                        text-3xl
                        sm:text-4xl

                        transition-all
                        duration-300

                        group-hover:scale-110
                        group-hover:bg-cyan-50

                        dark:bg-white/5
                        dark:group-hover:bg-cyan-500/10
                    "
                >
                    {icon}
                </div>

            </div>

            {/* Bottom Accent Line */}

            <div
                className="
                    mt-5
                    sm:mt-6

                    h-1

                    overflow-hidden
                    rounded-full

                    bg-slate-200

                    dark:bg-white/10
                "
            >

                <div
                    className="
                        h-full
                        w-2/3

                        rounded-full

                        bg-cyan-500

                        transition-all
                        duration-300

                        group-hover:w-full

                        dark:bg-cyan-400
                    "
                />

            </div>

        </div>

    );

}

export default StatsCard;