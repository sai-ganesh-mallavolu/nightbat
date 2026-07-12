import CopyButton from "../common/CopyButton";

function KeyPointsCard({ points }) {

    if (!points?.length) return null;

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
                    💡 Key Points
                </h2>

                <CopyButton
                    text={points.join("\n")}
                />

            </div>


            {/* Key Points List */}

            <ul className="space-y-4">

                {points.map((point, index) => (

                    <li
                        key={index}
                        className="
                            flex
                            items-start
                            gap-3
                            text-slate-700

                            dark:text-zinc-300
                        "
                    >

                        {/* Check Icon */}

                        <span
                            className="
                                mt-0.5
                                shrink-0
                                font-bold
                                text-cyan-600

                                dark:text-cyan-400
                            "
                        >
                            ✔
                        </span>


                        {/* Point */}

                        <span className="leading-7">
                            {point}
                        </span>

                    </li>

                ))}

            </ul>

        </div>

    );

}

export default KeyPointsCard;