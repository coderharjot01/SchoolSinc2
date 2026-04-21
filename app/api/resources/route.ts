import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const resources = await prisma.resource.findMany({
            orderBy: { createdAt: "desc" },
        });
        
        // Map data slightly to match what frontend expects
        const formattedResources = resources.map((res) => ({
            id: res.id,
            title: res.title,
            subject: res.subject,
            type: res.type,
            size: res.size || "1.0 MB",
            date: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(res.createdAt),
            isRecommended: res.isRecommended,
            views: res.views,
            url: res.url
        }));

        return NextResponse.json(formattedResources);
    } catch (error) {
        console.error("Failed to fetch resources:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
