import { useRef, useState } from "react";

import { validateFile } from "../../utils/fileValidation";

function UploadBox({
    file,
    setFile,
}) {

    const inputRef = useRef(null);

    const [dragActive, setDragActive] = useState(false);


    // ==========================
    // Handle File
    // ==========================

    const handleFile = (selectedFile) => {

        if (
            selectedFile &&
            validateFile(selectedFile)
        ) {
            setFile(selectedFile);
        }

    };


    // ==========================
    // Open File Browser
    // ==========================

    const openFileBrowser = () => {

        inputRef.current?.click();

    };


    return (

        <div
            onDragOver={(e) => {

                e.preventDefault();

                setDragActive(true);

            }}

            onDragLeave={(e) => {

                e.preventDefault();

                setDragActive(false);

            }}

            onDrop={(e) => {

                e.preventDefault();

                setDragActive(false);

                const droppedFile =
                    e.dataTransfer.files[0];

                handleFile(droppedFile);

            }}

            onClick={openFileBrowser}

            className={`
                flex
                h-80
                w-full
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-3xl
                border-2
                border-dashed
                px-6
                text-center
                transition-all
                duration-300

                ${dragActive

                    ? `
                            border-cyan-500
                            bg-cyan-50
                            shadow-lg
                            shadow-cyan-500/10

                            dark:border-cyan-400
                            dark:bg-cyan-500/10
                        `

                    : `
                            border-slate-300
                            bg-white
                            shadow-sm

                            hover:border-cyan-400
                            hover:bg-slate-50
                            hover:shadow-lg
                            hover:shadow-cyan-500/5

                            dark:border-white/15
                            dark:bg-[#18181b]
                            dark:hover:border-cyan-400
                            dark:hover:bg-[#1f1f23]
                        `
                }
            `}
        >

            {/* Hidden File Input */}

            <input
                ref={inputRef}
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {

                    const selectedFile =
                        e.target.files[0];

                    handleFile(selectedFile);

                    // Allows selecting the same file again
                    e.target.value = "";

                }}
            />


            {/* File Icon */}

            <div
                className="
                    mb-5
                    flex h-20 w-20
                    items-center justify-center
                    rounded-2xl
                    bg-cyan-50
                    text-5xl
                    transition-colors
                    duration-300

                    dark:bg-cyan-500/10
                "
            >
                📄
            </div>


            {/* File Name / Main Text */}

            <h2
                className="
                    max-w-2xl
                    break-words
                    text-2xl
                    font-bold
                    text-slate-900

                    dark:text-white
                "
            >

                {
                    file
                        ? file.name
                        : "Drag & Drop your document"
                }

            </h2>


            {/* Status */}

            <p
                className="
                    mt-3
                    text-slate-600

                    dark:text-zinc-400
                "
            >

                {
                    file
                        ? "File selected successfully"
                        : "or click to browse files"
                }

            </p>


            {/* File Size / Supported Types */}

            <p
                className="
                    mt-6
                    text-sm
                    font-medium
                    text-slate-500

                    dark:text-zinc-500
                "
            >

                {
                    file

                        ? `${(
                            file.size /
                            1024 /
                            1024
                        ).toFixed(2)} MB`

                        : "Supported: PDF • DOCX • TXT"
                }

            </p>

        </div>

    );

}

export default UploadBox;