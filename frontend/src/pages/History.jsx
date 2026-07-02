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

    useEffect(() => {

        fetchHistory();

    }, []);

    useEffect(() => {

        const filtered = documents.filter((doc) =>
            doc.filename
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        setFilteredDocuments(filtered);

    }, [search, documents]);

    const fetchHistory = async () => {

        try {

            const data = await getHistory();

            setDocuments(data);

            setFilteredDocuments(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load history.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleDeleteClick = (id) => {

        setSelectedDocument(id);

        setShowConfirm(true);

    };

    const handleDelete = async () => {

        try {

            setDeleting(true);

            await deleteDocument(selectedDocument);

            const updated = documents.filter(

                (doc) => doc.id !== selectedDocument

            );

            setDocuments(updated);

            setFilteredDocuments(updated);

            toast.success("Document deleted successfully!");

            setShowConfirm(false);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to delete document.");

        }

        finally {

            setDeleting(false);

        }

    };

    const uploadedToday = documents.filter((doc) => {

        const today = new Date();

        const upload = new Date(doc.uploaded_at);

        return today.toDateString() === upload.toDateString();

    }).length;

    const pdfCount = documents.filter((doc) =>
        doc.filename.toLowerCase().endsWith(".pdf")
    ).length;

    const docxCount = documents.filter((doc) =>
        doc.filename.toLowerCase().endsWith(".docx")
    ).length;

    return (

        <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6 py-20">

            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <div className="mb-14">

                    <h1 className="text-5xl font-extrabold tracking-tight">

                        📚 Analysis Workspace

                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-gray-400">

                        Manage your AI documents, continue conversations,
                        and organize your knowledge in one place.

                    </p>

                </div>

                {/* Stats */}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <StatsCard
                        icon="📄"
                        title="Documents"
                        value={documents.length}
                        color="text-cyan-400"
                    />

                    <StatsCard
                        icon="📕"
                        title="PDF Files"
                        value={pdfCount}
                        color="text-red-400"
                    />

                    <StatsCard
                        icon="📘"
                        title="DOCX Files"
                        value={docxCount}
                        color="text-blue-400"
                    />

                    <StatsCard
                        icon="📅"
                        title="Uploaded Today"
                        value={uploadedToday}
                        color="text-yellow-400"
                    />

                </div>

                {/* Search */}

                <div className="mt-12">

                    <div className="relative">

                        <input
                            type="text"
                            placeholder="🔍 Search your documents..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full rounded-2xl border border-cyan-500/20 bg-white/5 px-6 py-5 text-lg text-white placeholder-gray-500 outline-none backdrop-blur transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>

                </div>

                {/* Loading */}

                {loading && (

                    <div className="mt-24 text-center">

                        <div className="text-7xl animate-pulse">

                            🤖

                        </div>

                        <h2 className="mt-6 text-3xl font-bold text-cyan-400">

                            Loading Workspace...

                        </h2>

                    </div>

                )}

                {/* Empty */}

                {!loading && filteredDocuments.length === 0 && (

                    <div className="mt-20 rounded-3xl border border-dashed border-cyan-500/20 bg-white/5 p-16 text-center">

                        <div className="text-8xl">

                            📂

                        </div>

                        <h2 className="mt-8 text-4xl font-bold">

                            No Documents Found

                        </h2>

                        <p className="mt-4 text-gray-400">

                            Upload your first document or try a different search.

                        </p>

                    </div>

                )}

                {/* Documents */}

                {!loading && filteredDocuments.length > 0 && (

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

            <ConfirmModal

                open={showConfirm}

                title="Delete Document"

                message="Are you sure you want to permanently delete this document? This action cannot be undone."

                confirmText="Delete"

                cancelText="Cancel"

                loading={deleting}

                onCancel={() => setShowConfirm(false)}

                onConfirm={handleDelete}

            />

        </section>

    );

}

export default History;