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

            className="
                mx-auto
                w-full
                max-w-3xl
                cursor-pointer
                [perspective:1500px]
            "

            onClick={toggleFlip}

        >

            <div

                className={`
                    relative
                    h-[420px]
                    w-full
                    transition-transform
                    duration-700
                    [transform-style:preserve-3d]

                    ${flipped

                        ? "[transform:rotateY(180deg)]"

                        : ""
                    }
                `}

            >


                {/* ==========================
                    FRONT
                ========================== */}

                <div
                    className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        rounded-3xl
                        border
                        border-cyan-200
                        bg-gradient-to-br
                        from-white
                        via-cyan-50
                        to-slate-100
                        p-10
                        shadow-xl
                        shadow-slate-200/60
                        [backface-visibility:hidden]

                        dark:border-cyan-500/30
                        dark:from-[#18181b]
                        dark:via-[#111113]
                        dark:to-[#18181b]
                        dark:shadow-none
                    "
                >


                    {/* Icon */}

                    <div className="mb-6 text-6xl">

                        📚

                    </div>


                    {/* Question */}

                    <div
                        className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            overflow-y-auto
                            px-2
                        "
                    >

                        <h2
                            className="
                                break-words
                                text-center
                                text-2xl
                                font-bold
                                leading-relaxed
                                text-slate-900

                                dark:text-white
                            "
                        >

                            {question}

                        </h2>

                    </div>


                    {/* Flip Hint */}

                    <div
                        className="
                            mt-10
                            self-center
                            rounded-full
                            border
                            border-cyan-200
                            bg-cyan-50
                            px-5
                            py-2

                            dark:border-cyan-500/20
                            dark:bg-cyan-500/10
                        "
                    >

                        <p
                            className="
                                text-cyan-700

                                dark:text-cyan-300
                            "
                        >

                            Click or Press{" "}

                            <b>
                                SPACE
                            </b>

                        </p>

                    </div>

                </div>


                {/* ==========================
                    BACK
                ========================== */}

                <div
                    className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        rounded-3xl
                        border
                        border-violet-200
                        bg-gradient-to-br
                        from-white
                        via-violet-50
                        to-slate-100
                        p-10
                        shadow-xl
                        shadow-slate-200/60
                        [backface-visibility:hidden]
                        [transform:rotateY(180deg)]

                        dark:border-violet-500/30
                        dark:from-[#18181b]
                        dark:via-[#151218]
                        dark:to-[#111113]
                        dark:shadow-none
                    "
                >


                    {/* Icon */}

                    <div className="mb-6 text-center text-6xl">

                        💡

                    </div>


                    {/* Answer */}

                    <div
                        className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            overflow-y-auto
                            px-2
                        "
                    >

                        <p
                            className="
                                break-words
                                text-center
                                text-lg
                                leading-8
                                text-slate-700

                                dark:text-zinc-200
                            "
                        >

                            {answer}

                        </p>

                    </div>


                    {/* Flip Hint */}

                    <div
                        className="
                            mt-10
                            self-center
                            rounded-full
                            border
                            border-violet-200
                            bg-violet-50
                            px-5
                            py-2

                            dark:border-violet-500/20
                            dark:bg-violet-500/10
                        "
                    >

                        <p
                            className="
                                text-violet-700

                                dark:text-violet-300
                            "
                        >

                            Click or Press{" "}

                            <b>
                                SPACE
                            </b>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Flashcard;