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


    // ==========================
    // Analyze Document
    // ==========================

    const handleAnalyze = async () => {

        if (!file) {

            toast.warning(
                "Please select a document first."
            );

            return;

        }

        try {

            setLoading(true);

            const response =
                await uploadDocument(file);

            toast.success(
                "Analysis completed successfully! 🎉"
            );

            // Redirect to Document Details page
            navigate(
                `/history/${response.id}`
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Analysis failed. Please try again."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================
    // Remove File
    // ==========================

    const handleRemoveFile = () => {

        setFile(null);

        toast.info(
            "Document removed."
        );

    };


    return (

        <section
            className="
                min-h-screen
                bg-gradient-to-b
                from-white
                via-slate-50
                to-slate-100
                px-4
                sm:px-6
                lg:px-8

                py-12
                sm:py-16
                lg:py-20
                text-slate-900
                transition-colors
                duration-300

                dark:from-[#09090b]
                dark:via-[#0c0c0f]
                dark:to-[#111113]
                dark:text-white
            "
        >

            <div
                className="
                    mx-auto
                    w-full
                    max-w-5xl
                "
            >


                {/* Page Header */}

                <div className="text-center">

                    <h1
                        className="
                            text-3xl
                            sm:text-4xl
                            lg:text-5xl
                            font-extrabold
                            tracking-tight
                            text-slate-950

                            

                            dark:text-white
                        "
                    >
                        Upload Your Document
                    </h1>


                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-2xl
                            px-2

                            text-base
                            sm:text-lg

                            leading-7
                            sm:leading-8
                            text-slate-600

                            dark:text-zinc-400
                        "
                    >
                        Upload a document and let
                        NightBat AI analyze it.
                    </p>

                </div>


                {/* Upload Box */}

                <div className="mt-8
                    sm:mt-10
                    lg:mt-14">

                    <UploadBox
                        file={file}
                        setFile={setFile}
                        loading={loading}
                        handleAnalyze={handleAnalyze}
                    />

                </div>


                {/* File Information */}

                {file && (

                    <div className="mt-8
                            sm:mt-10">

                        <FileInfoCard
                            file={file}
                        />

                    </div>

                )}


                {/* Action Buttons */}

                {file && (

                    <div
                        className="
                            mt-8

                            flex
                            flex-col

                            gap-3

                            sm:flex-row
                            sm:flex-wrap
                            sm:justify-center
                            sm:gap-5
                        "
                    >

                        {/* Remove File */}

                        <button
                            onClick={handleRemoveFile}
                            disabled={loading}
                            className="
                                cursor-pointer
                                rounded-xl
                                border border-red-200
                                bg-red-50
                                w-full
                                sm:w-auto

                                px-6
                                sm:px-8

                                py-2.5
                                sm:py-3

                                text-sm
                                sm:text-base
                                font-semibold
                                text-red-600
                                transition-all
                                duration-300

                                hover:-translate-y-0.5
                                hover:border-red-300
                                hover:bg-red-100

                                disabled:cursor-not-allowed
                                disabled:opacity-60

                                dark:border-red-500/20
                                dark:bg-red-500/10
                                dark:text-red-400
                                dark:hover:bg-red-500/20
                            "
                        >
                            Remove File
                        </button>


                        {/* Analyze Document */}

                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="
                                cursor-pointer
                                rounded-xl
                                bg-cyan-500
                                w-full
                                sm:w-auto

                                px-6
                                sm:px-8

                                py-2.5
                                sm:py-3

                                text-sm
                                sm:text-base
                                font-semibold
                                text-slate-950
                                shadow-lg
                                shadow-cyan-500/20
                                transition-all
                                duration-300

                                hover:-translate-y-0.5
                                hover:bg-cyan-400
                                hover:shadow-xl
                                hover:shadow-cyan-500/25

                                disabled:cursor-not-allowed
                                disabled:opacity-60
                                disabled:hover:translate-y-0
                            "
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

                    <div className="mt-10
                            sm:mt-12">

                        <Loader />

                    </div>

                )}

            </div>

        </section>

    );

}

export default Upload;