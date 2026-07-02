import { pdf } from "@react-pdf/renderer";
import ReportDocument from "./ReportDocument";

export const downloadReport = async ({
    filename,
    summary,
    keyPoints,
    actionItems,
}) => {

    const blob = await pdf(
        <ReportDocument
            filename={filename}
            summary={summary}
            keyPoints={keyPoints}
            actionItems={actionItems}
        />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
        `${filename.replace(/\.[^/.]+$/, "")}_NightBat_Report.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

};