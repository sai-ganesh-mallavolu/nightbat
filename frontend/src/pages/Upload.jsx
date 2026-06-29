import { useState } from "react";
import UploadBox from "../components/upload/UploadBox";
import { uploadDocument } from "../services/uploadService";

function Upload() {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {

        if (!file) return;

        try {

            setLoading(true);

            const response = await uploadDocument(file);

            console.log(response);

            alert("Upload Successful ✅");

        } catch (error) {

            console.error(error);

            alert("Upload Failed ❌");

        } finally {

            setLoading(false);

        }

    };

    return (
        <section className="min-h-screen bg-gray-950 px-6 py-20">

            <div className="mx-auto max-w-5xl">

                <h1 className="text-center text-5xl font-bold">
                    Upload Your Document
                </h1>

                <p className="mt-5 text-center text-gray-400">
                    Upload a document and let NightBat AI analyze it.
                </p>

                <div className="mt-14">
                    <UploadBox
                        file={file}
                        setFile={setFile}
                        loading={loading}
                        handleAnalyze={handleAnalyze}
                    />
                </div>

                {file && (
                    <div className="mt-8 flex justify-center gap-4">

                        <button
                            onClick={() => setFile(null)}
                            className="cursor-pointer rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600"
                        >
                            Remove File
                        </button>

                        <button
                            disabled={loading}
                            onClick={handleAnalyze}
                            className="cursor-pointer rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Analyzing..." : "Analyze Document"}
                        </button>

                    </div>
                )}

            </div>



        </section>
    );
}

export default Upload;