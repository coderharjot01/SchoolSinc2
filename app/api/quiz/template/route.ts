import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
    try {
        // Create template data with headers and sample questions
        const templateData = [
            [
                "Question",
                "Option A",
                "Option B",
                "Option C",
                "Option D",
                "Correct Answer",
                "Explanation (Optional)",
                "Difficulty (Optional)",
                "XP Reward (Optional)",
            ],
            [
                "What is the capital of France?",
                "London",
                "Berlin",
                "Paris",
                "Madrid",
                "C",
                "Paris is the capital and largest city of France.",
                "Easy",
                "10",
            ],
            [
                "Which planet is known as the Red Planet?",
                "Venus",
                "Mars",
                "Jupiter",
                "Saturn",
                "B",
                "Mars appears red due to iron oxide on its surface.",
                "Easy",
                "10",
            ],
            [
                "What is the chemical symbol for water?",
                "H2O",
                "CO2",
                "NaCl",
                "O2",
                "A",
                "Water is composed of two hydrogen atoms and one oxygen atom.",
                "Easy",
                "10",
            ],
            [
                "Who wrote 'Romeo and Juliet'?",
                "Charles Dickens",
                "William Shakespeare",
                "Jane Austen",
                "Mark Twain",
                "B",
                "William Shakespeare wrote this famous tragedy in the late 16th century.",
                "Medium",
                "15",
            ],
            [
                "What is the square root of 144?",
                "10",
                "11",
                "12",
                "14",
                "C",
                "12 × 12 = 144",
                "Medium",
                "15",
            ],
        ];

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(templateData);

        // Set column widths
        worksheet["!cols"] = [
            { wch: 50 }, // Question
            { wch: 25 }, // Option A
            { wch: 25 }, // Option B
            { wch: 25 }, // Option C
            { wch: 25 }, // Option D
            { wch: 15 }, // Correct Answer
            { wch: 50 }, // Explanation
            { wch: 15 }, // Difficulty
            { wch: 15 }, // XP Reward
        ];

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Questions");

        // Generate buffer
        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        // Return file response
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": "attachment; filename=quiz_template.xlsx",
            },
        });
    } catch (error) {
        console.error("Error generating template:", error);
        return NextResponse.json(
            { error: "Failed to generate template" },
            { status: 500 }
        );
    }
}
