import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

// Define expected question structure
interface QuizQuestion {
    id: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    explanation?: string;
    difficulty?: string;
    xpReward?: number;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Check file type
        const fileName = file.name.toLowerCase();
        const isExcel = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");

        if (!isExcel) {
            return NextResponse.json(
                { error: "Only Excel files (.xlsx, .xls) are supported for now" },
                { status: 400 }
            );
        }

        // Read file as ArrayBuffer
        const buffer = await file.arrayBuffer();

        // Parse Excel file
        const workbook = XLSX.read(buffer, { type: "array" });

        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert sheet to JSON
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Skip header row and parse questions
        const questions: QuizQuestion[] = [];
        let hasErrors = false;
        const errors: string[] = [];

        // Expected headers: Question, Option A, Option B, Option C, Option D, Correct Answer, Explanation, Difficulty, XP Reward
        for (let i = 1; i < rawData.length; i++) {
            const row = rawData[i] as (string | number | undefined)[];

            // Skip empty rows
            if (!row || row.length === 0 || !row[0]) {
                continue;
            }

            const question = String(row[0] || "").trim();
            const optionA = String(row[1] || "").trim();
            const optionB = String(row[2] || "").trim();
            const optionC = String(row[3] || "").trim();
            const optionD = String(row[4] || "").trim();
            const correctAnswer = String(row[5] || "").trim().toUpperCase();
            const explanation = String(row[6] || "").trim();
            const difficulty = String(row[7] || "Medium").trim();
            const xpReward = parseInt(String(row[8] || "10"));

            // Validate required fields
            if (!question) {
                errors.push(`Row ${i + 1}: Missing question text`);
                hasErrors = true;
                continue;
            }

            if (!optionA || !optionB || !optionC || !optionD) {
                errors.push(`Row ${i + 1}: Missing one or more options`);
                hasErrors = true;
                continue;
            }

            if (!["A", "B", "C", "D"].includes(correctAnswer)) {
                errors.push(`Row ${i + 1}: Invalid correct answer (must be A, B, C, or D)`);
                hasErrors = true;
                continue;
            }

            questions.push({
                id: questions.length + 1,
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAnswer,
                explanation: explanation || undefined,
                difficulty: difficulty || "Medium",
                xpReward: isNaN(xpReward) ? 10 : xpReward,
            });
        }

        if (questions.length === 0) {
            return NextResponse.json(
                {
                    error: "No valid questions found in the file",
                    details: errors.length > 0 ? errors : ["The file appears to be empty or incorrectly formatted"],
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `Successfully parsed ${questions.length} questions`,
            questions,
            warnings: hasErrors ? errors : [],
        });
    } catch (error) {
        console.error("Error parsing quiz file:", error);
        return NextResponse.json(
            { error: "Failed to parse the file. Please ensure it follows the correct format." },
            { status: 500 }
        );
    }
}
