import CopyButton from "../common/CopyButton";

function SummaryCard({ summary }) {

    if (!summary) return null;

    return (

        <div
            className="
                rounded-2xl
                sm:rounded-3xl

                border
                border-slate-200

                bg-white

                p-5
                sm:p-6

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

            <div
                className="
                    mb-5

                    flex
                    flex-col
                    gap-4

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <h2
                    className="
                        break-words

                        text-xl
                        sm:text-2xl

                        font-bold

                        text-cyan-600

                        dark:text-cyan-400
                    "
                >
                    📄 Summary
                </h2>

                <div className="self-start sm:self-auto">
                    <CopyButton text={summary} />
                </div>

            </div>

            {/* Summary Content */}

            <div
                className="
                    rounded-xl

                    bg-slate-50

                    p-4
                    sm:p-5

                    dark:bg-white/5
                "
            >

                <p
                    className="
                        whitespace-pre-wrap
                        break-words

                        text-sm
                        sm:text-base

                        leading-7
                        sm:leading-8

                        text-slate-700

                        dark:text-zinc-300
                    "
                >
                    {summary}
                </p>

            </div>

        </div>

    );

}

export default SummaryCard;