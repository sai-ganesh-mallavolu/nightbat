function FeatureCard({ Icon, title, description }) {

    return (

        <div
            className="
                group
                rounded-2xl
                border border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300

                hover:-translate-y-2
                hover:border-cyan-400
                hover:shadow-xl
                hover:shadow-cyan-500/10

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none
                dark:hover:border-cyan-400
                dark:hover:bg-[#1f1f23]
                dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]
            "
        >

            {/* Icon */}

            <div
                className="
                    mb-5
                    inline-flex
                    rounded-xl
                    bg-cyan-50
                    p-4
                    text-cyan-600
                    transition-colors
                    duration-300

                    dark:bg-cyan-500/10
                    dark:text-cyan-400
                "
            >
                <Icon
                    size={34}
                    strokeWidth={2}
                />
            </div>


            {/* Title */}

            <h3
                className="
                    mb-3
                    text-2xl
                    font-bold
                    text-slate-900

                    dark:text-white
                "
            >
                {title}
            </h3>


            {/* Description */}

            <p
                className="
                    leading-7
                    text-slate-600

                    dark:text-zinc-400
                "
            >
                {description}
            </p>

        </div>

    );

}

export default FeatureCard;