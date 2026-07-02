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

        <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">

            <h3 className="mb-5 text-center text-xl font-bold text-cyan-300">

                ⌨ Keyboard Shortcuts

            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                {

                    shortcuts.map((item) => (

                        <div

                            key={item.key}

                            className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-center transition hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"

                        >

                            <div className="mb-3 inline-flex min-w-[60px] items-center justify-center rounded-lg bg-cyan-500 px-3 py-2 font-bold text-black">

                                {item.key}

                            </div>

                            <p className="text-sm text-gray-300">

                                {item.action}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default KeyboardShortcuts;