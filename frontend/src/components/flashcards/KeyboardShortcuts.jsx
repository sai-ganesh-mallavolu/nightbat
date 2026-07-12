function KeyboardShortcuts() {

    const shortcuts = [

        {
            key: "←",
            action: "Previous Card",
        },

        {
            key: "→",
            action: "Next Card",
        },

        {
            key: "SPACE",
            action: "Flip Card",
        },

        {
            key: "L",
            action: "Mark as Learned",
        },

        {
            key: "S",
            action: "Shuffle Cards",
        },

    ];


    return (

        <div
            className="
                mt-10
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-6
                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#111113]
            "
        >

            {/* Heading */}

            <h3
                className="
                    mb-5
                    text-center
                    text-xl
                    font-bold
                    text-cyan-700

                    dark:text-cyan-300
                "
            >

                ⌨ Keyboard Shortcuts

            </h3>


            {/* Shortcut Cards */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-4

                    sm:grid-cols-2
                    lg:grid-cols-5
                "
            >

                {shortcuts.map((item) => (

                    <div
                        key={item.key}
                        className="
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            p-4
                            text-center
                            shadow-sm
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:border-cyan-400
                            hover:shadow-md
                            hover:shadow-cyan-500/10

                            dark:border-white/10
                            dark:bg-[#18181b]
                            dark:shadow-none

                            dark:hover:border-cyan-500/50
                            dark:hover:shadow-lg
                            dark:hover:shadow-cyan-500/10
                        "
                    >

                        {/* Keyboard Key */}

                        <div
                            className="
                                mb-3
                                inline-flex
                                min-w-[60px]
                                items-center
                                justify-center
                                rounded-lg
                                bg-cyan-500
                                px-3
                                py-2
                                font-bold
                                text-slate-950
                                shadow-sm
                                shadow-cyan-500/20
                            "
                        >

                            {item.key}

                        </div>


                        {/* Action */}

                        <p
                            className="
                                text-sm
                                text-slate-600

                                dark:text-zinc-300
                            "
                        >

                            {item.action}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default KeyboardShortcuts;