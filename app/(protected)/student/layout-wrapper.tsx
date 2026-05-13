"use client";

import { PortalLayout } from "@/components/layout/portal-layout";
import { FloatingAIBot } from "@/components/ui/floating-ai-bot";

interface LayoutWrapperProps {
    children: React.ReactNode;
    role: "admin" | "faculty" | "student" | "parent";
    userName: string;
}

export function PortalLayoutWrapper({ children, role, userName }: LayoutWrapperProps) {
    return (
        <PortalLayout role={role} userName={userName}>
            {children}
            <FloatingAIBot />
        </PortalLayout>
    );
}
