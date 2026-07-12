import {
    Trophy,
    RotateCcw,
    Brain,
} from "lucide-react";


function StudyComplete({

    total,

    onRestart,

    onQuiz,

}) {

    return (

        <div
            className="
                mt-10
                overflow-hidden
                rounded-3xl
                border
                border-green-200
                bg-gradient-to-br
                from-green-50
                via-emerald-50
                to-cyan-50
                p-10
                text-center
                shadow-xl
                shadow-green-100/50
                transition-colors
                duration-300

                dark:border-green-500/20
                dark:from-green-500/10
                dark:via-emerald-500/5
                dark:to-cyan-500/10
                dark:shadow-none
            "
        >

            {/* Trophy Icon */}

            <div
                className="
                    mx-auto
                    mb-6
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-green-200
                    bg-green-100

                    dark:border-green-500/20
                    dark:bg-green-500/10
                "
            >

                <Trophy
                    size={50}
                    className="
                        text-yellow-500

                        dark:text-yellow-400
                    "
                />

            </div>


            {/* Heading */}

            <h2
                className="
                    mb-3
                    text-4xl
                    font-bold
                    text-slate-950

                    dark:text-white
                "
            >

                🎉 Congratulations!

            </h2>


            {/* Completion Message */}

            <p
                className="
                    mb-8
                    text-lg
                    text-slate-600

                    dark:text-zinc-300
                "
            >

                You have mastered all{" "}

                <span
                    className="
                        font-bold
                        text-cyan-600

                        dark:text-cyan-400
                    "
                >

                    {total}

                </span>{" "}

                NightBat AI study cards.

            </p>


            {/* Completion Progress */}

            <div className="mb-8">

                <div
                    className="
                        mx-auto
                        h-4
                        w-full
                        max-w-md
                        overflow-hidden
                        rounded-full
                        bg-slate-200

                        dark:bg-zinc-700
                    "
                >

                    <div
                        className="
                            h-full
                            bg-gradient-to-r
                            from-green-400
                            via-cyan-400
                            to-violet-500
                        "
                        style={{
                            width: "100%",
                        }}
                    />

                </div>


                <p
                    className="
                        mt-3
                        font-medium
                        text-green-600

                        dark:text-green-400
                    "
                >

                    Study Completion • 100%

                </p>

            </div>


            {/* Action Buttons */}

            <div
                className="
                    flex
                    flex-wrap
                    justify-center
                    gap-5
                "
            >

                {/* Restart Study */}

                <button
                    type="button"
                    onClick={onRestart}
                    className="
                        flex
                        cursor-pointer
                        items-center
                        gap-2
                        rounded-xl
                        bg-cyan-500
                        px-6
                        py-3
                        font-semibold
                        text-slate-950
                        shadow-md
                        shadow-cyan-500/20
                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-cyan-400
                        hover:shadow-lg
                    "
                >

                    <RotateCcw size={18} />

                    Restart Study

                </button>


                {/* Take Quiz */}

                <button
                    type="button"
                    onClick={onQuiz}
                    className="
                        flex
                        cursor-pointer
                        items-center
                        gap-2
                        rounded-xl
                        bg-violet-600
                        px-6
                        py-3
                        font-semibold
                        text-white
                        shadow-md
                        shadow-violet-500/20
                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-violet-500
                        hover:shadow-lg
                    "
                >

                    <Brain size={18} />

                    Take Quiz

                </button>

            </div>

        </div>

    );

}

export default StudyComplete;