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
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
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

            <div className="flex items-start justify-between">

                {/* Stats Information */}

                <div>

                    <p
                        className="
                            text-sm
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
                            mt-4
                            text-5xl
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
                        rounded-2xl
                        bg-slate-100
                        p-4
                        text-4xl
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
                    mt-6
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

                        dark:bg-cyan-400
                    "
                />

            </div>

        </div>

    );

}

export default StatsCard;