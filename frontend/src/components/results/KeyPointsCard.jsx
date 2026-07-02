import CopyButton from "../common/CopyButton";

function KeyPointsCard({ points }) {

    if (!points?.length) return null;

    return (

        <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 shadow-lg">

            <div className="mb-5 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-cyan-400">
                    💡 Key Points
                </h2>

                <CopyButton text={points.join("\n")} />

            </div>

            <ul className="space-y-4">

                {points.map((point, index) => (

                    <li
                        key={index}
                        className="flex items-start gap-3 text-gray-300"
                    >

                        <span className="text-cyan-400 font-bold">
                            ✔
                        </span>

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