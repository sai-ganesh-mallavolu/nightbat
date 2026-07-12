import CopyButton from "../common/CopyButton";

function SummaryCard({ summary }) {

    if (!summary) return null;

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-md
                shadow-slate-200/50
                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none
            "
        >

            {/* Header */}

            <div className="mb-5 flex items-center justify-between gap-4">

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-cyan-600

                        dark:text-cyan-400
                    "
                >
                    📄 Summary
                </h2>

                <CopyButton text={summary} />

            </div>


            {/* Summary Content */}

            <p
                className="
                    whitespace-pre-wrap
                    leading-8
                    text-slate-700

                    dark:text-zinc-300
                "
            >
                {summary}
            </p>

        </div>

    );

}

export default SummaryCard;