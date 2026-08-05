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
    // Keyboard (SPACE / ENTER)
    // ==========================

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (

                event.target.tagName === "INPUT" ||

                event.target.tagName === "TEXTAREA"

            ) {

                return;

            }

            if (

                event.code === "Space" ||

                event.code === "Enter"

            ) {

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

                select-none

                [perspective:1500px]
            "

            onClick={toggleFlip}

            role="button"

            tabIndex={0}

            aria-label="Flashcard"

            onKeyDown={(e) => {

                if (

                    e.key === "Enter" ||

                    e.key === " "

                ) {

                    e.preventDefault();

                    toggleFlip();

                }

            }}

        >

            <div

                className={`
                    relative

                    h-[360px]
                    sm:h-[420px]
                    lg:h-[450px]

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

                        rounded-2xl
                        sm:rounded-3xl

                        border
                        border-cyan-200

                        bg-gradient-to-br
                        from-white
                        via-cyan-50
                        to-slate-100

                        p-5
                        sm:p-8
                        lg:p-10

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

                    <div
                        className="
                            mb-5

                            text-5xl
                            sm:text-6xl

                            text-center
                        "
                    >
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

                            px-1
                            sm:px-2
                        "
                    >

                        <h2
                            className="
                                break-words

                                text-center

                                text-xl
                                sm:text-2xl

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
                            mt-8

                            self-center

                            rounded-full

                            border
                            border-cyan-200

                            bg-cyan-50

                            px-4
                            sm:px-5

                            py-2

                            dark:border-cyan-500/20
                            dark:bg-cyan-500/10
                        "
                    >

                        <p
                            className="
                                text-center

                                text-sm
                                sm:text-base

                                text-cyan-700

                                dark:text-cyan-300
                            "
                        >

                            Click / Tap or Press <b>SPACE / ENTER</b>

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

                        rounded-2xl
                        sm:rounded-3xl

                        border
                        border-violet-200

                        bg-gradient-to-br
                        from-white
                        via-violet-50
                        to-slate-100

                        p-5
                        sm:p-8
                        lg:p-10

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

                    <div
                        className="
                            mb-5

                            text-center

                            text-5xl
                            sm:text-6xl
                        "
                    >
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

                            px-1
                            sm:px-2
                        "
                    >

                        <p
                            className="
                                break-words

                                text-center

                                text-base
                                sm:text-lg

                                leading-7
                                sm:leading-8

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
                            mt-8

                            self-center

                            rounded-full

                            border
                            border-violet-200

                            bg-violet-50

                            px-4
                            sm:px-5

                            py-2

                            dark:border-violet-500/20
                            dark:bg-violet-500/10
                        "
                    >

                        <p
                            className="
                                text-center

                                text-sm
                                sm:text-base

                                text-violet-700

                                dark:text-violet-300
                            "
                        >

                            Click / Tap or Press <b>SPACE / ENTER</b>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Flashcard;