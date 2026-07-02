import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UploadBox from "../components/upload/UploadBox";
import { uploadDocument } from "../services/uploadService";

import Loader from "../components/results/Loader";
import FileInfoCard from "../components/results/FileInfoCard";

import { toast } from "react-toastify";

function Upload() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {

        if (!file) {

            toast.warning("Please select a document first.");

            return;

        }

        try {

            setLoading(true);

            const response = await uploadDocument(file);

            toast.success("Analysis completed successfully! 🎉");

            // Redirect to Document Details page
            navigate(`/history/${response.id}`);

        }

        catch (error) {

            console.error(error);

            toast.error("Analysis failed. Please try again.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleRemoveFile = () => {

        setFile(null);

        toast.info("Document removed.");

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

                {/* Upload Box */}

                <div className="mt-14">

                    <UploadBox

                        file={file}

                        setFile={setFile}

                        loading={loading}

                        handleAnalyze={handleAnalyze}

                    />

                </div>

                {/* File Information */}

                {file && (

                    <div className="mt-10">

                        <FileInfoCard file={file} />

                    </div>

                )}

                {/* Buttons */}

                {file && (

                    <div className="mt-8 flex justify-center gap-5">

                        <button

                            onClick={handleRemoveFile}

                            className="cursor-pointer rounded-xl bg-red-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600"

                        >

                            Remove File

                        </button>

                        <button

                            onClick={handleAnalyze}

                            disabled={loading}

                            className="cursor-pointer rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"

                        >

                            {

                                loading

                                    ? "Analyzing..."

                                    : "Analyze Document"

                            }

                        </button>

                    </div>

                )}

                {/* AI Loader */}

                {loading && (

                    <div className="mt-12">

                        <Loader />

                    </div>

                )}

            </div>

        </section>

    );

}

export default Upload;