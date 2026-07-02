import jsPDF from "jspdf";

export const downloadQuizReport = async ({
    documentName,
    questions,
    answers,
    result,
}) => {

    const pdf = new jsPDF();

    let y = 20;

    pdf.setFontSize(22);
    pdf.text("NightBat AI Quiz Report", 20, y);

    y += 15;

    pdf.setFontSize(12);

    pdf.text(`Document : ${documentName}`, 20, y);
    y += 10;

    pdf.text(`Correct : ${result.correct}`, 20, y);
    y += 8;

    pdf.text(`Wrong : ${result.wrong}`, 20, y);
    y += 8;

    pdf.text(`Skipped : ${result.unanswered}`, 20, y);
    y += 8;

    pdf.text(`Accuracy : ${result.percentage}%`, 20, y);
    y += 8;

    const minutes = Math.floor(result.timeTaken / 60);
    const seconds = result.timeTaken % 60;

    pdf.text(
        `Time Taken : ${minutes}:${String(seconds).padStart(2, "0")}`,
        20,
        y
    );

    y += 18;

    pdf.setFontSize(18);

    pdf.text("Question Review", 20, y);

    y += 12;

    pdf.setFontSize(11);

    questions.forEach((question, index) => {

        if (y > 260) {

            pdf.addPage();

            y = 20;

        }

        pdf.setFont(undefined, "bold");

        pdf.text(`Q${index + 1}. ${question.question}`, 20, y);

        y += 8;

        pdf.setFont(undefined, "normal");

        pdf.text(
            `Your Answer : ${answers[index] || "Not Answered"}`,
            25,
            y
        );

        y += 7;

        pdf.text(
            `Correct Answer : ${question.correct_answer}`,
            25,
            y
        );

        y += 7;

        const explanation = pdf.splitTextToSize(
            `Explanation : ${question.explanation}`,
            165
        );

        pdf.text(explanation, 25, y);

        y += explanation.length * 6 + 10;

    });

    pdf.save("NightBat_Quiz_Report.pdf");

};