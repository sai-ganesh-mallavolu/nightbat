import { Trophy, RotateCcw, Brain } from "lucide-react";

function StudyComplete({

    total,

    onRestart,

    onQuiz,

}) {

    return (

        <div className="mt-10 overflow-hidden rounded-3xl border border-green-500/30 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-cyan-500/10 p-10 text-center shadow-xl">

            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">

                <Trophy
                    size={50}
                    className="text-yellow-400"
                />

            </div>

            <h2 className="mb-3 text-4xl font-bold text-white">

                🎉 Congratulations!

            </h2>

            <p className="mb-8 text-lg text-gray-300">

                You have mastered all{" "}

                <span className="font-bold text-cyan-400">

                    {total}

                </span>{" "}

                NightBat AI study cards.

            </p>

            <div className="mb-8">

                <div className="mx-auto h-4 w-full max-w-md overflow-hidden rounded-full bg-slate-700">

                    <div
                        className="h-full bg-gradient-to-r from-green-400 via-cyan-400 to-violet-500"
                        style={{
                            width: "100%",
                        }}
                    />

                </div>

                <p className="mt-3 text-green-400">

                    Study Completion • 100%

                </p>

            </div>

            <div className="flex flex-wrap justify-center gap-5">

                <button

                    onClick={onRestart}

                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:scale-105 hover:bg-cyan-400"

                >

                    <RotateCcw size={18} />

                    Restart Study

                </button>

                <button

                    onClick={onQuiz}

                    className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-violet-500"

                >

                    <Brain size={18} />

                    Take Quiz

                </button>

            </div>

        </div>

    );

}

export default StudyComplete;