export function validateFile(selectedFile) {

    if (!selectedFile) return false;

    const allowedTypes = [
        "application/pdf",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
        alert("Only PDF, DOCX and TXT files are allowed.");
        return false;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
        alert("Maximum file size is 10 MB.");
        return false;
    }

    return true;
}