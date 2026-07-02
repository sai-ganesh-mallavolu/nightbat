function DeleteModal({

    open,
    onClose,
    onConfirm,

}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-gray-900 p-8 shadow-2xl">

                <div className="text-center">

                    <div className="text-6xl">

                        🗑️

                    </div>

                    <h2 className="mt-5 text-3xl font-bold">

                        Delete Document

                    </h2>

                    <p className="mt-4 text-gray-400">

                        Are you sure you want to delete this document?

                    </p>

                    <p className="mt-2 text-sm text-red-400">

                        This action cannot be undone.

                    </p>

                </div>

                <div className="mt-8 flex justify-center gap-4">

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-gray-600 px-6 py-3 transition hover:bg-gray-800"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;