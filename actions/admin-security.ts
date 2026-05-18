"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { authenticator } from "otplib";

export async function generateTwoFactorSecret() {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") return { error: "Unauthorized" };

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(session.user.email as string, "SchoolSinc2 Admin", secret);

    await prisma.user.update({
        where: { id: session.user.id },
        data: { twoFactorSecret: secret }
    });

    return { secret, otpauth };
}

export async function verifyAndEnableTwoFactor(token: string) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") return { error: "Unauthorized" };

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user?.twoFactorSecret) return { error: "Secret not generated" };

    const isValid = authenticator.check(token, user.twoFactorSecret);
    
    if (isValid) {
        await prisma.user.update({
            where: { id: user.id },
            data: { twoFactorEnabled: true }
        });
        return { success: true };
    }
    
    return { error: "Invalid authenticator code" };
}

export async function getTwoFactorStatus() {
    const session = await auth();
    if (!session?.user?.id) return { enabled: false };
    
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    return { enabled: user?.twoFactorEnabled ?? false };
}
