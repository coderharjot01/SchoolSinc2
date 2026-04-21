"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        if (document.cookie.includes("googtrans=/en/hi")) {
            setLang("hi");
        } else {
            setLang("en");
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = lang === "en" ? "hi" : "en";
        
        if (newLang === "hi") {
            document.cookie = "googtrans=/en/hi; path=/";
            if (window.location.hostname !== "localhost") {
                document.cookie = "googtrans=/en/hi; path=/; domain=" + window.location.hostname;
                document.cookie = "googtrans=/en/hi; path=/; domain=." + window.location.hostname;
            }
        } else {
            document.cookie = "googtrans=/en/en; path=/";
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            if (window.location.hostname !== "localhost") {
                document.cookie = "googtrans=/en/en; path=/; domain=" + window.location.hostname;
                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
            }
        }
        
        setLang(newLang);
        window.location.reload();
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title={lang === "en" ? "Translate to Hindi" : "Translate to English"}
        >
            <Languages className="h-5 w-5 text-slate-500" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:block">
                {lang === "en" ? "HI" : "EN"}
            </span>
        </button>
    );
}
