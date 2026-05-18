
import type { NextAuthConfig } from "next-auth";
// Note: Credentials provider and Prisma are defined in auth.ts only.
// auth.config.ts runs in Edge runtime where Prisma is not compatible.
// Keep this file light with only configuration that works in Edge runtime.

export const authConfig = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 60 minutes expiration
    },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const userRole = (auth?.user as any)?.role as string | undefined;

            const isOnAdminPortal = nextUrl.pathname.startsWith("/admin");
            const isOnFacultyPortal = nextUrl.pathname.startsWith("/faculty");
            const isOnStudentPortal = nextUrl.pathname.startsWith("/student");
            const isOnParentPortal = nextUrl.pathname.startsWith("/parent");
            const isOnProtectedRoute = isOnAdminPortal || isOnFacultyPortal || isOnStudentPortal || isOnParentPortal;

            if (isOnProtectedRoute) {
                if (!isLoggedIn) {
                    // Redirect unauthenticated users to specific portal login
                    if (isOnAdminPortal) {
                        return Response.redirect(new URL("/auth/login/admin", nextUrl));
                    } else if (isOnFacultyPortal) {
                        return Response.redirect(new URL("/auth/login/faculty", nextUrl));
                    } else if (isOnStudentPortal) {
                        return Response.redirect(new URL("/auth/login/student", nextUrl));
                    } else if (isOnParentPortal) {
                        return Response.redirect(new URL("/auth/login/parent", nextUrl));
                    }
                    return false;
                }

                // Enforce role-based access control
                if (userRole) {
                    const roleToPortal: Record<string, string> = {
                        'ADMIN': '/admin',
                        'FACULTY': '/faculty',
                        'STUDENT': '/student',
                        'PARENT': '/parent'
                    };

                    const allowedPortal = roleToPortal[userRole];

                    // Check if user is trying to access a portal that doesn't match their role
                    if (isOnAdminPortal && userRole !== 'ADMIN') {
                        return Response.redirect(new URL(`${allowedPortal}/dashboard`, nextUrl));
                    }
                    if (isOnFacultyPortal && userRole !== 'FACULTY') {
                        return Response.redirect(new URL(`${allowedPortal}/dashboard`, nextUrl));
                    }
                    if (isOnStudentPortal && userRole !== 'STUDENT') {
                        return Response.redirect(new URL(`${allowedPortal}/dashboard`, nextUrl));
                    }
                    if (isOnParentPortal && userRole !== 'PARENT') {
                        return Response.redirect(new URL(`${allowedPortal}/dashboard`, nextUrl));
                    }
                }

                return true;
            }

            // Redirect logged-in users from auth pages to their appropriate dashboard
            if (isLoggedIn && nextUrl.pathname.startsWith("/auth")) {
                const roleToPortal: Record<string, string> = {
                    'ADMIN': '/admin/dashboard',
                    'FACULTY': '/faculty/dashboard',
                    'STUDENT': '/student/dashboard',
                    'PARENT': '/parent/dashboard'
                };
                const redirectUrl = userRole ? roleToPortal[userRole] : '/';
                if (redirectUrl && redirectUrl !== '/') {
                    return Response.redirect(new URL(redirectUrl, nextUrl));
                }
            }

            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                // @ts-ignore
                session.user.role = token.role;
            }
            if (token.name && session.user) {
                session.user.name = token.name as string;
            }
            if (token.email && session.user) {
                session.user.email = token.email as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.name = (user as any).name;
                token.email = (user as any).email;
            }
            return token;
        }
    },
    providers: [
        // We will define providers in auth.ts to avoid edge runtime issues with bcrypt if any
        // But for now, let's put it here or keep it empty and merge in auth.ts?
        // NextAuth v5 pattern: auth.config.ts has everything EXCEPT database adapters/providers that use node modules not compatible with Edge.
        // Credentials provider is fine if we don't import bcrypt here directly? 
        // Actually standard practice: put empty providers here, merge in auth.ts
    ] satisfies NextAuthConfig["providers"],
} satisfies NextAuthConfig;
