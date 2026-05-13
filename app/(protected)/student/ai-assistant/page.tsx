"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles, Loader2, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm your AI Study Assistant. I'm trained on your school's resources, timetable, and curriculum. How can I help you today? You can ask me to summarize a topic or explain a concept.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let responseText = "I'm sorry, I couldn't find specific information about that in the current syllabus.";
      
      const lowerInput = userMsg.content.toLowerCase();
      if (lowerInput.includes("physics") || lowerInput.includes("newton")) {
        responseText = "Based on 'Physics Chapter 5 Notes', Newton's first law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. Would you like a breakdown of the second law?";
      } else if (lowerInput.includes("math") || lowerInput.includes("calculus")) {
        responseText = "I see you're asking about Calculus! According to the 'Math Calculus Formulas' resource, the derivative of x^n is n*x^(n-1). Do you want to practice some integration problems?";
      } else if (lowerInput.includes("summarize") || lowerInput.includes("explain")) {
        responseText = "Certainly! Think of it like this: The core concept revolves around understanding the basic principles before moving to complex applications. Make sure to review the 'Video Lectures' assigned last week for a deeper visual explanation.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        responseText = "Hello! I am ready to help you study. What subject should we focus on today?";
      } else {
        responseText = "That's an interesting question! Based on the school curriculum, I recommend checking the 'Resources' tab for more detailed materials. Is there a specific subject you want to dive into?";
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: responseText },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <PageHeader
        breadcrumb="Home / Academics / AI Tutor"
        title="AI Study Assistant"
        subtitle="Your personalized 24/7 learning companion"
      />

      <Card className="flex-1 flex flex-col overflow-hidden border-green-100 dark:border-green-900 shadow-lg">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 p-4 border-b border-green-100 dark:border-green-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-xl text-white shadow-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
                ScholarBot <Sparkles className="h-3 w-3 text-yellow-500" />
              </h3>
              <p className="text-xs text-green-700 dark:text-green-400 font-medium">Trained on HS21 Curriculum</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-green-600 bg-green-200/50 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Online
          </div>
        </div>

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 sm:gap-4 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className={`h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 ${msg.role === 'assistant' ? 'border-2 border-green-200' : 'border-2 border-slate-200'}`}>
                {msg.role === "assistant" ? (
                  <div className="bg-green-100 h-full w-full flex items-center justify-center text-green-600">
                    <Bot className="h-5 w-5" />
                  </div>
                ) : (
                  <>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Student" />
                    <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                  </>
                )}
              </Avatar>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm sm:text-base shadow-sm ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-tr-none"
                    : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border-2 border-green-200 flex-shrink-0">
                <div className="bg-green-100 h-full w-full flex items-center justify-center text-green-600">
                  <Bot className="h-5 w-5" />
                </div>
              </Avatar>
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-none px-4 py-4 flex items-center gap-1 shadow-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input Area */}
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2 relative"
          >
            <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all flex items-center px-2">
               <button type="button" className="p-2 text-slate-400 hover:text-green-600 transition-colors hidden sm:block">
                  <BookOpen className="h-5 w-5" />
               </button>
               <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about physics, math, or your syllabus..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-2 h-12 shadow-none text-sm sm:text-base"
               />
            </div>
            
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="h-12 w-12 rounded-2xl bg-green-600 hover:bg-green-700 shadow-md flex-shrink-0 transition-transform active:scale-95"
            >
              {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </form>
          <div className="text-center mt-2 text-[10px] text-slate-400">
             AI responses can occasionally be inaccurate. Please cross-reference with official resources.
          </div>
        </div>
      </Card>
    </div>
  );
}
