import CopyButton from "../common/CopyButton";

function SummaryCard({ summary }) {

    if (!summary) return null;

    return (

        <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 shadow-lg">

            <div className="mb-5 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-cyan-400">
                    📄 Summary
                </h2>

                <CopyButton text={summary} />

            </div>

            <p className="whitespace-pre-wrap leading-8 text-gray-300">
                {summary}
            </p>

        </div>

    );

}

export default SummaryCard;