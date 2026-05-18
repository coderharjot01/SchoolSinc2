import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter that allows 5 login attempts per 15 minutes per IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
});

const { auth } = NextAuth(authConfig);

export default async function middleware(req: NextRequest) {
    // SECURITY: Rate Limiting for Login Attempts
    // This blocks bots from brute-forcing passwords
    if (req.method === "POST" && req.nextUrl.pathname.includes("/auth/login")) {
        // Only run rate limiter if Upstash is configured
        if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
            const ip = req.ip ?? "127.0.0.1";
            const { success } = await ratelimit.limit(ip);
            
            if (!success) {
                // If the limit is reached, return a 429 Too Many Requests response
                return new NextResponse(
                    JSON.stringify({ error: "Too many login attempts. Please try again in 15 minutes." }),
                    { status: 429, headers: { "Content-Type": "application/json" } }
                );
            }
        } else {
            console.warn("⚠️ Rate limiting skipped: Upstash Redis environment variables are missing.");
        }
    }
    
    // Proceed with normal NextAuth protection
    return auth(req);
}

export const config = {
    // Apply to all routes except api, static files, and images
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
