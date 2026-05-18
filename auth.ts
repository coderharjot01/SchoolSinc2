
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// We need a prisma instance. Let's assume we create one or import it.
// To be safe, let's use a local instance or import verify later.
// const prisma = new PrismaClient();

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "text" },
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                        role: z.enum(["ADMIN", "FACULTY", "STUDENT", "PARENT"]).optional(),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password, role } = parsedCredentials.data;
                    console.log("Login attempt:", { email, role, passwordProvided: !!password });

                    // Helper function to find user with retry logic
                    const findUserWithRetry = async (retries = 1) => {
                        try {
                            return await prisma.user.findUnique({ where: { email } });
                        } catch (error) {
                            if (retries > 0) {
                                console.log("Database query failed, retrying...");
                                // Wait a short time before retrying to allow connection to establish
                                await new Promise(resolve => setTimeout(resolve, 500));
                                return findUserWithRetry(retries - 1);
                            }
                            throw error;
                        }
                    };

                    try {
                        const user = await findUserWithRetry();
                        console.log("User found:", user ? { id: user.id, email: user.email, role: user.role } : "No user found");

                        if (!user) {
                            console.log("Returning null: User not found");
                            return null;
                        }

                        // Enforce Role Check if role is provided
                        if (role && user.role !== role) {
                            console.log(`Role mismatch: User role ${user.role} does not match required role ${role}`);
                            return null;
                        }

                        // Support both bcrypt hashes (new) and plaintext (legacy)
                        const { compare } = await import("bcryptjs");
                        let passwordMatch = false;
                        
                        if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$") || user.password.startsWith("$2y$")) {
                            passwordMatch = await compare(password, user.password);
                        } else {
                            passwordMatch = password === user.password;
                        }

                        if (passwordMatch) {
                            console.log("Password match success");
                            return {
                                id: String(user.id),
                                name: user.name,
                                email: user.email,
                                role: user.role,
                            } as any;
                        } else {
                            console.log("Password mismatch");
                            return null;
                        }
                    } catch (error) {
                        console.error("Authorization error:", error);
                        return null;
                    }
                }

                console.log("Invalid credentials schema parse failed");
                return null;
            },
        }),
    ],
});
