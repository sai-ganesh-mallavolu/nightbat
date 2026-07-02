import { useEffect } from "react";

function Flashcard({

    question,

    answer,

    flipped,

    setFlipped,

}) {

    const toggleFlip = () => {

        setFlipped((prev) => !prev);

    };

    // ==========================
    // Keyboard (SPACE)
    // ==========================

    useEffect(() => {

        const handleKeyDown = (event) => {

            // Ignore when typing

            if (

                event.target.tagName === "INPUT" ||

                event.target.tagName === "TEXTAREA"

            ) {

                return;

            }

            if (event.code === "Space") {

                event.preventDefault();

                toggleFlip();

            }

        };

        window.addEventListener(

            "keydown",

            handleKeyDown

        );

        return () => {

            window.removeEventListener(

                "keydown",

                handleKeyDown

            );

        };

    }, []);

    return (

        <div

            className="mx-auto w-full max-w-3xl cursor-pointer [perspective:1500px]"

            onClick={toggleFlip}

        >

            <div

                className={`relative h-96 w-full transition-transform duration-700 [transform-style:preserve-3d]

                ${flipped

                        ? "[transform:rotateY(180deg)]"

                        : ""

                    }

            `}

            >

                {/* FRONT */}

                <div

                    className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-cyan-500/30

                    bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900

                    p-10 shadow-2xl [backface-visibility:hidden]"

                >

                    <div className="mb-6 text-6xl">

                        📚

                    </div>

                    <div className="flex-1 flex items-center justify-center overflow-y-auto px-2">

                        <h2 className="text-center text-2xl font-bold leading-relaxed text-white break-words">

                            {question}

                        </h2>

                    </div>
                    <div className="mt-10 rounded-full bg-cyan-500/20 px-5 py-2">

                        <p className="text-cyan-300">

                            Click or Press <b>SPACE</b>

                        </p>

                    </div>

                </div>

                {/* BACK */}

                <div

                    className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-violet-500/30

                    bg-gradient-to-br from-violet-900 via-slate-900 to-black

                    p-10 shadow-2xl

                    [backface-visibility:hidden]

                    [transform:rotateY(180deg)]"

                >

                    <div className="mb-6 text-6xl">

                        💡

                    </div>

                    <div className="flex-1 overflow-y-auto px-2">

                        <p className="text-center text-lg leading-8 text-white break-words">

                            {answer}

                        </p>

                    </div>
                    <div className="mt-10 rounded-full bg-violet-500/20 px-5 py-2">

                        <p className="text-violet-300">

                            Click or Press <b>SPACE</b>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Flashcard;