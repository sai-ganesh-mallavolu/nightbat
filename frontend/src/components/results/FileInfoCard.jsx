function FileInfoCard({ file }) {

    if (!file) return null;

    const getFileType = () => {

        const extension = file.name.split(".").pop().toUpperCase();

        return extension;
    };

    return (

        <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold text-cyan-400">
                📄 File Information
            </h2>

            <div className="space-y-3 text-gray-300">

                <p>
                    <span className="font-semibold text-white">
                        Name:
                    </span>{" "}
                    {file.name}
                </p>

                <p>
                    <span className="font-semibold text-white">
                        Size:
                    </span>{" "}
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <p>
                    <span className="font-semibold text-white">
                        Type:
                    </span>{" "}
                    {getFileType()}
                </p>

                <p>
                    <span className="font-semibold text-white">
                        Status:
                    </span>{" "}
                    <span className="text-green-400">
                        Ready for AI Analysis ✅
                    </span>
                </p>

            </div>

        </div>

    );
}

export default FileInfoCard;