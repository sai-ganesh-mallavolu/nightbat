import CopyButton from "../common/CopyButton";

function ActionItemsCard({ items }) {

    if (!items?.length) return null;

    return (

        <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 shadow-lg">

            <div className="mb-5 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-cyan-400">
                    ✅ Action Items
                </h2>

                <CopyButton text={items.join("\n")} />

            </div>

            <ul className="space-y-4">

                {items.map((item, index) => (

                    <li
                        key={index}
                        className="flex items-start gap-3 text-gray-300"
                    >

                        <span className="font-bold text-green-400">
                            □
                        </span>

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