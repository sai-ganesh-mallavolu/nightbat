import { useRef, useState } from "react";
import { validateFile } from "../../utils/fileValidation";

function UploadBox({
    file,
    setFile,
    loading,
    handleAnalyze,
}) {

    const inputRef = useRef(null);

    const [dragActive, setDragActive] = useState(false);

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const droppedFile = e.dataTransfer.files[0];

                if (validateFile(droppedFile)) {
                    setFile(droppedFile);
                }
            }}
            onClick={() => inputRef.current.click()} className={`flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white/5 transition-all duration-300

            ${dragActive
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-cyan-500/40 hover:border-cyan-400 hover:bg-white/10"
                }`}>

            <input
                ref={inputRef}
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                    const selectedFile = e.target.files[0];

                    if (validateFile(selectedFile)) {
                        setFile(selectedFile);
                    }
                }}
            />
            <div className="mb-4 text-6xl">
                📄
            </div>

            <h2 className="text-2xl font-bold">

                {file
                    ? file.name
                    : "Drag & Drop your document"}

            </h2>

            <p className="mt-3 text-gray-400">

                {file
                    ? "File selected successfully"
                    : "or click to browse files"}

            </p>

            <p className="mt-6 text-sm text-gray-500">
                {file
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    : "Supported: PDF • DOCX • TXT"}
            </p>



        </div>
    );
}

export default UploadBox;