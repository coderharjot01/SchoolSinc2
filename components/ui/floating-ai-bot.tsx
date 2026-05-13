"use client";

import Link from "next/link";
import { Bot } from "lucide-react";

export function FloatingAIBot() {
  return (
    <Link
      href="/student/ai-assistant"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all hover:scale-110 animate-bounce"
    >
      <Bot className="h-7 w-7" />
    </Link>
  );
}
