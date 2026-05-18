"use server";

import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "User not found" };

    const token = uuidv4();
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.passwordResetToken.create({
        data: { email, token, expires }
    });

    const resetUrl = `/auth/reset-password?token=${token}`;
    
    // In production, send this via email using Resend or Nodemailer.
    // For demo purposes, we return it to display on the screen.
    console.log("Simulated Email Sent! Reset URL:", resetUrl);
    
    return { success: true, debugUrl: resetUrl };
}

export async function resetPassword(token: string, newPassword: string) {
    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!resetToken || resetToken.expires < new Date()) {
        return { error: "Invalid or expired token" };
    }

    const { hash } = await import("bcryptjs");
    const hashedPassword = await hash(newPassword, 10);

    await prisma.user.update({
        where: { email: resetToken.email },
        data: { password: hashedPassword }
    });

    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

    return { success: true };
}
