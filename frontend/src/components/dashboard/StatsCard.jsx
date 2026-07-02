function StatsCard({

    icon,

    title,

    value,

    color,

}) {

    return (

        <div className="group overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-cyan-500/20">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm uppercase tracking-widest text-gray-400">

                        {title}

                    </p>

                    <h2 className={`mt-4 text-5xl font-bold ${color}`}>

                        {value}

                    </h2>

                </div>

                <div className="rounded-2xl bg-cyan-500/10 p-4 text-4xl transition duration-300 group-hover:scale-110">

                    {icon}

                </div>

            </div>

            <div className="mt-6 h-1 rounded-full bg-white/10">

                <div className="h-full w-2/3 rounded-full bg-cyan-400"></div>

            </div>

        </div>

    );

}

export default StatsCard;