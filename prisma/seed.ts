
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

async function main() {
    console.log("Seeding database...");

    // 1. Admin
    const admin = await prisma.user.upsert({
        where: { email: "admin@hs21schools.com" },
        update: {},
        create: {
            email: "admin@hs21schools.com",
            password: "password123", // In a real app, hash this!
            name: "Admin User",
            role: "ADMIN",
        },
    });
    console.log({ admin });

    // 2. Faculty
    const faculty = await prisma.user.upsert({
        where: { email: "teacher@hs21schools.com" },
        update: {},
        create: {
            email: "teacher@hs21schools.com",
            password: "password123",
            name: "John Teacher",
            role: "FACULTY",
        },
    });
    console.log({ faculty });

    // 3. Student
    const student = await prisma.user.upsert({
        where: { email: "student@hs21schools.com" },
        update: {},
        create: {
            email: "student@hs21schools.com",
            password: "password123",
            name: "Alice Student",
            role: "STUDENT",
        },
    });
    console.log({ student });
    
    // 4. Parent
    const parent = await prisma.user.upsert({
        where: { email: "parent@hs21schools.com" },
        update: {},
        create: {
            email: "parent@hs21schools.com",
            password: "password123",
            name: "Emily Parent",
            role: "PARENT",
        },
    });
    console.log({ parent });

    // 5. Resources
    const resources = await prisma.resource.createMany({
        data: [
            { title: "Physics Chapter 5 Notes", subject: "Physics", type: "PDF", size: "2.5 MB", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", isRecommended: true, views: 128 },
            { title: "Math Calculus Formulas", subject: "Math", type: "PDF", size: "1.2 MB", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", isRecommended: false, views: 89 },
            { title: "Chemical Bonding Lecture", subject: "Chemistry", type: "Video", size: "150 MB", url: "https://www.youtube.com", isRecommended: true, views: 256 },
            { title: "English Grammar Workbook", subject: "English", type: "Worksheet", size: "4.0 MB", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", isRecommended: false, views: 45 },
            { title: "Biology Diagram Set", subject: "Biology", type: "Image", size: "5.5 MB", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", isRecommended: false, views: 72 },
        ]
    });
    console.log({ resourcesCount: resources.count });

    console.log("Seeding finished.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
