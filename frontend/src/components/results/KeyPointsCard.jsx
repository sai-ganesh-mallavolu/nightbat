import CopyButton from "../common/CopyButton";

function KeyPointsCard({ points }) {

    if (!points?.length) return null;

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
                    mb-6

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
                    💡 Key Points
                </h2>

                <div className="self-start sm:self-auto">
                    <CopyButton
                        text={points.join("\n")}
                    />
                </div>

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

                            rounded-xl

                            bg-slate-50

                            p-4

                            transition-colors
                            duration-300

                            dark:bg-white/5
                        "
                    >

                        {/* Check Icon */}

                        <span
                            className="
                                mt-0.5

                                shrink-0

                                text-lg

                                font-bold

                                text-cyan-600

                                dark:text-cyan-400
                            "
                        >
                            ✔
                        </span>


                        {/* Point */}

                        <span
                            className="
                                flex-1

                                break-words

                                text-sm
                                sm:text-base

                                leading-7
                                sm:leading-8

                                text-slate-700

                                dark:text-zinc-300
                            "
                        >
                            {point}
                        </span>

                    </li>

                ))}

            </ul>

        </div>

    );

}

export default KeyPointsCard;