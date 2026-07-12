import CopyButton from "../common/CopyButton";

function ActionItemsCard({ items }) {

    if (!items?.length) return null;

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
                    ✅ Action Items
                </h2>

                <CopyButton
                    text={items.join("\n")}
                />

            </div>


            {/* Action Items List */}

            <ul className="space-y-4">

                {items.map((item, index) => (

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

                        {/* Checkbox Icon */}

                        <span
                            className="
                                mt-0.5
                                shrink-0
                                font-bold
                                text-green-600

                                dark:text-green-400
                            "
                        >
                            □
                        </span>


                        {/* Action Item */}

                        <span className="leading-7">
                            {item}
                        </span>

                    </li>

                ))}

            </ul>

        </div>

    );

}

export default ActionItemsCard;