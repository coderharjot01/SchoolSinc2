import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

// Initialize Turso Client
const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:./dev.db", // Fallback to local if env variables are missing initially
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const adapter = new PrismaLibSql(libsql);

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient;
    prismaConnected: boolean;
};

// Create PrismaClient with connection pooling configuration
const createPrismaClient = () => {
    const client = new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

    return client;
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

// Ensure the database connection is established immediately
// This prevents the first request from failing while the connection is being established
if (!globalForPrisma.prismaConnected) {
    prisma.$connect()
        .then(() => {
            console.log("✅ Turso Database connection established");
            globalForPrisma.prismaConnected = true;
        })
        .catch((error) => {
            console.error("❌ Failed to connect to Turso database:", error);
        });
}

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
