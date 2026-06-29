function FeatureCard({ Icon, title, description }) {
    return (
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">

            <div className="mb-5 inline-flex rounded-xl bg-cyan-500/10 p-4 text-cyan-400">
                <Icon size={34} strokeWidth={2} />
            </div>

            <h3 className="mb-3 text-2xl font-bold">
                {title}
            </h3>

            <p className="leading-7 text-gray-400">
                {description}
            </p>

        </div >
    );
}

export default FeatureCard;