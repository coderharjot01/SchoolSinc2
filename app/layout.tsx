import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "HS21Schools ERP",
  description: "Enterprise High School ERP System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div id="google_translate_element" style={{ display: "none" }}></div>
        <script
            dangerouslySetInnerHTML={{
                __html: `
                window.googleTranslateElementInit = function() {
                    new window.google.translate.TranslateElement({
                        pageLanguage: 'en',
                        includedLanguages: 'hi,en',
                        autoDisplay: false
                    }, 'google_translate_element');
                }
                `
            }}
        />
        <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async defer></script>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
