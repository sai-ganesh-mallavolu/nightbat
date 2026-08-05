function FileInfoCard({ file }) {

    if (!file) return null;

    // ==========================
    // Get File Type
    // ==========================

    const getFileType = () => {

        return file.name
            .split(".")
            .pop()
            .toUpperCase();

    };


    // ==========================
    // Get File Size
    // ==========================

    const getFileSize = () => {

        return `${(file.size / 1024 / 1024).toFixed(2)} MB`;

    };


    return (

        <div
            className="
                rounded-2xl
                sm:rounded-3xl

                border
                border-slate-200

                bg-white

                p-5
                sm:p-6

                shadow-md
                shadow-slate-200/50

                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none
            "
        >

            {/* Heading */}

            <h2
                className="
                    mb-6

                    text-xl
                    sm:text-2xl

                    font-bold

                    text-cyan-600

                    dark:text-cyan-400
                "
            >
                📄 File Information
            </h2>


            {/* File Details */}

            <div className="space-y-4">

                {/* File Name */}

                <div
                    className="
                        rounded-xl

                        bg-slate-50

                        p-4

                        dark:bg-white/5
                    "
                >

                    <p
                        className="
                            text-xs
                            uppercase
                            tracking-wider

                            text-slate-500

                            dark:text-zinc-400
                        "
                    >
                        File Name
                    </p>

                    <p
                        className="
                            mt-1

                            break-all

                            text-sm
                            sm:text-base

                            font-semibold

                            text-slate-900

                            dark:text-white
                        "
                    >
                        {file.name}
                    </p>

                </div>


                {/* File Size */}

                <div
                    className="
                        rounded-xl

                        bg-slate-50

                        p-4

                        dark:bg-white/5
                    "
                >

                    <p
                        className="
                            text-xs
                            uppercase
                            tracking-wider

                            text-slate-500

                            dark:text-zinc-400
                        "
                    >
                        File Size
                    </p>

                    <p
                        className="
                            mt-1

                            text-sm
                            sm:text-base

                            font-semibold

                            text-slate-900

                            dark:text-white
                        "
                    >
                        {getFileSize()}
                    </p>

                </div>


                {/* File Type */}

                <div
                    className="
                        rounded-xl

                        bg-slate-50

                        p-4

                        dark:bg-white/5
                    "
                >

                    <p
                        className="
                            text-xs
                            uppercase
                            tracking-wider

                            text-slate-500

                            dark:text-zinc-400
                        "
                    >
                        File Type
                    </p>

                    <p
                        className="
                            mt-1

                            text-sm
                            sm:text-base

                            font-semibold

                            text-slate-900

                            dark:text-white
                        "
                    >
                        {getFileType()}
                    </p>

                </div>


                {/* Status */}

                <div
                    className="
                        rounded-xl

                        border
                        border-green-200

                        bg-green-50

                        p-4

                        dark:border-green-500/30
                        dark:bg-green-500/10
                    "
                >

                    <p
                        className="
                            text-xs
                            uppercase
                            tracking-wider

                            text-green-700

                            dark:text-green-400
                        "
                    >
                        Status
                    </p>

                    <p
                        className="
                            mt-1

                            text-sm
                            sm:text-base

                            font-semibold

                            text-green-700

                            dark:text-green-400
                        "
                    >
                        ✅ Ready for AI Analysis
                    </p>

                </div>

            </div>

        </div>

    );

}

export default FileInfoCard;