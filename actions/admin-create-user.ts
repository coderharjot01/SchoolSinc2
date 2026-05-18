"use server";

import { prisma } from "@/lib/prisma";

const DEFAULT_PASSWORD = "Abhi@99";

interface CreateUserResult {
    success?: string;
    error?: string;
    userId?: string;
}

// Create a student user (called when admin adds a new student)
export async function createStudentUser(
    email: string,
    name: string
): Promise<CreateUserResult> {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.warn("Create Student User Error: Email already exists", email);
            return { error: "Email already in use" };
        }

        // Create user with STUDENT role
        const user = await prisma.user.create({
            data: {
                email,
                password: DEFAULT_PASSWORD,
                name,
                role: "STUDENT",
            },
        });

        console.log("Student user created successfully:", email);
        return { success: "Student user created successfully", userId: user.id };
    } catch (error) {
        console.error("Error creating student user:", error);
        return { error: "Failed to create student user" };
    }
}

// Create a faculty user (called when admin adds a new staff member)
export async function createFacultyUser(
    email: string,
    name: string
): Promise<CreateUserResult> {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.warn("Create Faculty User Error: Email already exists", email);
            return { error: "Email already in use" };
        }

        // Create user with FACULTY role
        const user = await prisma.user.create({
            data: {
                email,
                password: DEFAULT_PASSWORD,
                name,
                role: "FACULTY",
            },
        });

        console.log("Faculty user created successfully:", email);
        return { success: "Faculty user created successfully", userId: user.id };
    } catch (error) {
        console.error("Error creating faculty user:", error);
        return { error: "Failed to create faculty user" };
    }
}

// Create a parent user (called when admin adds a new student)
// Parent email format: parent.{student_email}
export async function createParentUser(
    studentEmail: string,
    parentName: string
): Promise<CreateUserResult> {
    console.log("=== createParentUser called ===");
    console.log("Student email:", studentEmail);
    console.log("Parent name:", parentName);

    try {
        // Generate parent email: parent.{student_email}
        const parentEmail = `parent.${studentEmail}`;
        console.log("Generated parent email:", parentEmail);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: parentEmail },
        });
        console.log("Existing user check:", existingUser ? "Found" : "Not found");

        if (existingUser) {
            console.warn("Create Parent User Error: Email already exists", parentEmail);
            return { error: "Parent email already in use" };
        }

        // Create user with PARENT role
        console.log("Creating parent user with data:", {
            email: parentEmail,
            password: DEFAULT_PASSWORD,
            name: parentName || "Parent",
            role: "PARENT",
        });

        const user = await prisma.user.create({
            data: {
                email: parentEmail,
                password: DEFAULT_PASSWORD,
                name: parentName || "Parent",
                role: "PARENT",
            },
        });

        console.log("Parent user created successfully:", parentEmail, "ID:", user.id);
        return { success: "Parent user created successfully", userId: user.id };
    } catch (error) {
        console.error("=== Error creating parent user ===");
        console.error("Error type:", typeof error);
        console.error("Error message:", error instanceof Error ? error.message : String(error));
        console.error("Full error:", error);
        return { error: `Failed to create parent user: ${error instanceof Error ? error.message : String(error)}` };
    }
}

export async function bulkCreateStudents(students: { name: string, email: string, password?: string, parentName?: string }[]) {
    try {
        const { hash } = await import("bcryptjs");
        let successCount = 0;
        let skipCount = 0;
        const newlyCreated = [];

        for (const s of students) {
            if (!s.email || !s.name) {
                skipCount++;
                continue;
            }

            const existing = await prisma.user.findUnique({ where: { email: s.email } });
            if (existing) {
                skipCount++;
                continue;
            }

            const rawPassword = s.password || DEFAULT_PASSWORD;
            const hashedPassword = await hash(rawPassword, 10);

            await prisma.user.create({
                data: {
                    email: s.email,
                    password: hashedPassword,
                    name: s.name,
                    role: "STUDENT",
                }
            });

            if (s.parentName) {
                const parentEmail = `parent.${s.email}`;
                const existingParent = await prisma.user.findUnique({ where: { email: parentEmail } });
                if (!existingParent) {
                    await prisma.user.create({
                        data: {
                            email: parentEmail,
                            password: hashedPassword,
                            name: s.parentName,
                            role: "PARENT",
                        }
                    });
                }
            }
            successCount++;
            newlyCreated.push({
                name: s.name,
                email: s.email,
                parentName: s.parentName || "N/A"
            });
        }

        return { 
            success: `Successfully imported ${successCount} students. Skipped ${skipCount} invalid or duplicate rows.`,
            newStudents: newlyCreated
        };
    } catch (error) {
        console.error("Bulk create error:", error);
        return { error: "Failed to process bulk upload. Please check your Excel format." };
    }
}
