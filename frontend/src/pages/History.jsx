import { useEffect, useState } from "react";

import {
    getHistory,
    deleteDocument,
} from "../services/historyService";

import HistoryCard from "../components/history/HistoryCard";
import StatsCard from "../components/dashboard/StatsCard";

import ConfirmModal from "../components/common/ConfirmModal";

import { toast } from "react-toastify";

function History() {

    const [documents, setDocuments] = useState([]);

    const [filteredDocuments, setFilteredDocuments] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [showConfirm, setShowConfirm] = useState(false);

    const [selectedDocument, setSelectedDocument] = useState(null);

    const [deleting, setDeleting] = useState(false);


    // ==========================
    // Load History
    // ==========================

    useEffect(() => {

        fetchHistory();

    }, []);


    // ==========================
    // Search Documents
    // ==========================

    useEffect(() => {

        const filtered = documents.filter((doc) =>
            doc.filename
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        setFilteredDocuments(filtered);

    }, [search, documents]);


    // ==========================
    // Fetch History
    // ==========================

    const fetchHistory = async () => {

        try {

            const data = await getHistory();

            setDocuments(data);

            setFilteredDocuments(data);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load history."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================
    // Delete Document
    // ==========================

    const handleDeleteClick = (id) => {

        setSelectedDocument(id);

        setShowConfirm(true);

    };


    const handleDelete = async () => {

        try {

            setDeleting(true);

            await deleteDocument(
                selectedDocument
            );

            const updated = documents.filter(
                (doc) =>
                    doc.id !== selectedDocument
            );

            setDocuments(updated);

            setFilteredDocuments(updated);

            toast.success(
                "Document deleted successfully!"
            );

            setShowConfirm(false);

            setSelectedDocument(null);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Failed to delete document."
            );

        }

        finally {

            setDeleting(false);

        }

    };


    // ==========================
    // Statistics
    // ==========================

    const uploadedToday = documents.filter((doc) => {

        const today = new Date();

        const upload =
            new Date(doc.uploaded_at);

        return (
            today.toDateString() ===
            upload.toDateString()
        );

    }).length;


    const pdfCount = documents.filter((doc) =>
        doc.filename
            .toLowerCase()
            .endsWith(".pdf")
    ).length;


    const docxCount = documents.filter((doc) =>
        doc.filename
            .toLowerCase()
            .endsWith(".docx")
    ).length;


    return (

        <section
            className="
                min-h-screen
                bg-gradient-to-b
                from-white
                via-slate-50
                to-slate-100
                px-6
                py-20
                text-slate-900
                transition-colors
                duration-300

                dark:from-[#09090b]
                dark:via-[#0c0c0f]
                dark:to-[#111113]
                dark:text-white
            "
        >

            <div className="mx-auto max-w-7xl">


                {/* ==========================
                    Header
                ========================== */}

                <div className="mb-14">

                    <h1
                        className="
                            text-4xl
                            font-extrabold
                            tracking-tight
                            text-slate-950

                            md:text-5xl

                            dark:text-white
                        "
                    >
                        📚 Analysis Workspace
                    </h1>


                    <p
                        className="
                            mt-4
                            max-w-2xl
                            text-lg
                            leading-8
                            text-slate-600

                            dark:text-zinc-400
                        "
                    >
                        Manage your AI documents, continue conversations,
                        and organize your knowledge in one place.
                    </p>

                </div>


                {/* ==========================
                    Statistics
                ========================== */}

                <div
                    className="
                        grid
                        gap-6

                        md:grid-cols-2
                        xl:grid-cols-4
                    "
                >

                    <StatsCard
                        icon="📄"
                        title="Documents"
                        value={documents.length}
                        color="text-cyan-500 dark:text-cyan-400"
                    />

                    <StatsCard
                        icon="📕"
                        title="PDF Files"
                        value={pdfCount}
                        color="text-red-500 dark:text-red-400"
                    />

                    <StatsCard
                        icon="📘"
                        title="DOCX Files"
                        value={docxCount}
                        color="text-blue-500 dark:text-blue-400"
                    />

                    <StatsCard
                        icon="📅"
                        title="Uploaded Today"
                        value={uploadedToday}
                        color="text-amber-500 dark:text-yellow-400"
                    />

                </div>


                {/* ==========================
                    Search
                ========================== */}

                <div className="mt-12">

                    <div className="relative">

                        <input
                            type="text"
                            placeholder="🔍 Search your documents..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                                w-full
                                rounded-2xl
                                border border-slate-300
                                bg-white
                                px-6 py-5
                                text-lg
                                text-slate-900
                                shadow-sm
                                outline-none
                                transition-all
                                duration-300
                                placeholder:text-slate-400

                                focus:border-cyan-500
                                focus:ring-4
                                focus:ring-cyan-500/10

                                dark:border-white/10
                                dark:bg-[#18181b]
                                dark:text-white
                                dark:placeholder:text-zinc-500
                                dark:shadow-none

                                dark:focus:border-cyan-400
                                dark:focus:ring-cyan-400/10
                            "
                        />

                    </div>

                </div>


                {/* ==========================
                    Loading State
                ========================== */}

                {loading && (

                    <div className="mt-24 text-center">

                        <div className="animate-pulse text-7xl">
                            🤖
                        </div>

                        <h2
                            className="
                                mt-6
                                text-3xl
                                font-bold
                                text-cyan-600

                                dark:text-cyan-400
                            "
                        >
                            Loading Workspace...
                        </h2>

                        <p
                            className="
                                mt-3
                                text-slate-500

                                dark:text-zinc-500
                            "
                        >
                            Fetching your documents.
                        </p>

                    </div>

                )}


                {/* ==========================
                    Empty State
                ========================== */}

                {!loading &&
                    filteredDocuments.length === 0 && (

                        <div
                            className="
                                mt-20
                                rounded-3xl
                                border-2
                                border-dashed
                                border-slate-300
                                bg-white
                                p-16
                                text-center
                                shadow-sm

                                dark:border-white/10
                                dark:bg-[#18181b]
                                dark:shadow-none
                            "
                        >

                            <div className="text-8xl">
                                📂
                            </div>

                            <h2
                                className="
                                    mt-8
                                    text-4xl
                                    font-bold
                                    text-slate-950

                                    dark:text-white
                                "
                            >
                                No Documents Found
                            </h2>

                            <p
                                className="
                                    mt-4
                                    text-slate-600

                                    dark:text-zinc-400
                                "
                            >
                                Upload your first document or try a different search.
                            </p>

                        </div>

                    )}


                {/* ==========================
                    Documents
                ========================== */}

                {!loading &&
                    filteredDocuments.length > 0 && (

                        <div className="mt-12 space-y-6">

                            {filteredDocuments.map((doc) => (

                                <HistoryCard
                                    key={doc.id}
                                    document={doc}
                                    onDelete={handleDeleteClick}
                                />

                            ))}

                        </div>

                    )}

            </div>


            {/* ==========================
                Delete Confirmation
            ========================== */}

            <ConfirmModal
                open={showConfirm}
                title="Delete Document"
                message="Are you sure you want to permanently delete this document? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                loading={deleting}
                onCancel={() => {

                    setShowConfirm(false);

                    setSelectedDocument(null);

                }}
                onConfirm={handleDelete}
            />

        </section>

    );

}

export default History;