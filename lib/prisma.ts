import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient;
    prismaConnected: boolean;
};

// Create PrismaClient with standard setup
const createPrismaClient = () => {
    const client = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

    return client;
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

// Ensure the database connection is established immediately
if (!globalForPrisma.prismaConnected) {
    prisma.$connect()
        .then(() => {
            console.log("✅ PostgreSQL connection established");
            globalForPrisma.prismaConnected = true;
        })
        .catch((error) => {
            console.error("❌ Failed to connect to database:", error);
        });
}

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
