function FileInfoCard({ file }) {

    if (!file) return null;


    // ==========================
    // Get File Type
    // ==========================

    const getFileType = () => {

        const extension = file.name
            .split(".")
            .pop()
            .toUpperCase();

        return extension;

    };


    return (

        <div
            className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-6
                shadow-sm
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
                    text-2xl
                    font-bold
                    text-cyan-600

                    dark:text-cyan-400
                "
            >
                📄 File Information
            </h2>


            {/* File Details */}

            <div
                className="
                    space-y-4
                    text-slate-600

                    dark:text-zinc-400
                "
            >

                {/* File Name */}

                <p className="break-words">

                    <span
                        className="
                            font-semibold
                            text-slate-900

                            dark:text-white
                        "
                    >
                        Name:
                    </span>{" "}

                    {file.name}

                </p>


                {/* File Size */}

                <p>

                    <span
                        className="
                            font-semibold
                            text-slate-900

                            dark:text-white
                        "
                    >
                        Size:
                    </span>{" "}

                    {(
                        file.size /
                        1024 /
                        1024
                    ).toFixed(2)} MB

                </p>


                {/* File Type */}

                <p>

                    <span
                        className="
                            font-semibold
                            text-slate-900

                            dark:text-white
                        "
                    >
                        Type:
                    </span>{" "}

                    {getFileType()}

                </p>


                {/* Status */}

                <p>

                    <span
                        className="
                            font-semibold
                            text-slate-900

                            dark:text-white
                        "
                    >
                        Status:
                    </span>{" "}

                    <span
                        className="
                            font-medium
                            text-green-600

                            dark:text-green-400
                        "
                    >
                        Ready for AI Analysis ✅
                    </span>

                </p>

            </div>

        </div>

    );

}

export default FileInfoCard;