"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {
    Eye,
    EyeOff,
    GraduationCap,
    ShieldCheck,
    Users,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    Lock,
    Mail,
    Heart
} from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
    role?: "ADMIN" | "FACULTY" | "STUDENT" | "PARENT";
}

const roleConfig = {
    ADMIN: {
        icon: ShieldCheck,
        title: "Administrator",
        subtitle: "School Management Portal",
        color: "green",
        gradient: "from-green-600 to-green-700",
        lightBg: "bg-green-50",
        features: [
            "Complete system administration",
            "Staff & student management",
            "Financial oversight & reports",
            "System configuration"
        ]
    },
    FACULTY: {
        icon: Users,
        title: "Faculty Portal",
        subtitle: "Teaching & Management",
        color: "green",
        gradient: "from-green-500 to-green-600",
        lightBg: "bg-green-50",
        features: [
            "Class & attendance management",
            "Grade entry & assessments",
            "Leave applications",
            "Student progress tracking"
        ]
    },
    STUDENT: {
        icon: GraduationCap,
        title: "Student Portal",
        subtitle: "Learning & Growth",
        color: "yellow",
        gradient: "from-yellow-500 to-yellow-600",
        lightBg: "bg-yellow-50",
        features: [
            "View grades & performance",
            "Access class timetable",
            "Fee status & payments",
            "Learning resources"
        ]
    },
    PARENT: {
        icon: Heart,
        title: "Parent Portal",
        subtitle: "Monitor & Support",
        color: "yellow",
        gradient: "from-yellow-400 to-yellow-500",
        lightBg: "bg-yellow-50",
        features: [
            "Track child's progress",
            "View attendance & performance",
            "Fee payments & receipts",
            "School communication"
        ]
    }
};

export default function LoginForm({
    className,
    role = "STUDENT",
    ...props
}: LoginFormProps) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const config = roleConfig[role];
    const IconComponent = config.icon;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                role: role,
                callbackUrl,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password. Please try again.");
            } else {
                let redirectUrl = callbackUrl;
                if (redirectUrl === "/" || redirectUrl === "/auth/login") {
                    if (role === "ADMIN") redirectUrl = "/admin/dashboard";
                    else if (role === "FACULTY") redirectUrl = "/faculty/dashboard";
                    else if (role === "STUDENT") redirectUrl = "/student/dashboard";
                    else if (role === "PARENT") redirectUrl = "/parent/dashboard";
                }

                window.location.href = redirectUrl;
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className={cn("min-h-screen flex", className)} {...props}>
            {/* Left Panel - Branding */}
            <div className={`hidden lg:flex lg:w-1/2 bg-gradient-to-br ${config.gradient} relative overflow-hidden`}>
                {/* Background decoration */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                            <GraduationCap className="h-8 w-8" />
                        </div>
                        <span className="text-2xl font-bold">HS21Schools</span>
                    </Link>

                    {/* Main content */}
                    <div className="space-y-8">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl inline-block">
                            <IconComponent className="h-16 w-16 text-white" />
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold text-white mb-3">
                                {config.title}
                            </h1>
                            <p className="text-xl text-white/80">
                                {config.subtitle}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {config.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 text-white/90">
                                    <div className="bg-white/20 p-1 rounded-full">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-white/60 text-sm">
                        <p>Secure access for authorized users only.</p>
                        <p className="mt-1">© 2024 HS21Schools. All rights reserved.</p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* Mobile header */}
                <div className="lg:hidden bg-gradient-to-r ${config.gradient} p-6">
                    <Link href="/" className="flex items-center gap-3 text-white">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold">HS21Schools</span>
                    </Link>
                </div>

                {/* Form container */}
                <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-24 bg-white dark:bg-slate-900">
                    <div className="flex justify-between items-center mb-8">
                        {/* Back link */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to home
                        </Link>
                        <LanguageSwitcher />
                    </div>

                    <div className="max-w-md w-full mx-auto">
                        {/* Mobile icon */}
                        <div className="lg:hidden mb-6">
                            <div className={`${config.lightBg} p-4 rounded-2xl w-fit`}>
                                <IconComponent className={`h-10 w-10 text-${config.color}-600`} />
                            </div>
                        </div>

                        {/* Title */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                Welcome back
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Sign in to your {config.title.toLowerCase()} account to continue
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@school.edu"
                                        required
                                        className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-offset-0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                                        Password
                                    </Label>
                                    <a
                                        href="#"
                                        className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="pl-10 pr-10 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-offset-0"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                                    <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className={`w-full h-12 text-base font-semibold bg-gradient-to-r ${config.gradient} hover:opacity-90 transition-opacity`}
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>
                        </form>

                        {/* Sign up link */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-600 dark:text-slate-400">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href={`/auth/signup/${role.toLowerCase()}`}
                                    className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-semibold"
                                >
                                    Contact administrator
                                </Link>
                            </p>
                        </div>

                        {/* Role switcher */}
                        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-4">
                                Not a {role.toLowerCase()}? Sign in as:
                            </p>
                            <div className="flex justify-center gap-4">
                                {Object.entries(roleConfig).map(([key, value]) => {
                                    if (key === role) return null;
                                    const Icon = value.icon;
                                    return (
                                        <Link
                                            key={key}
                                            href={`/auth/login/${key.toLowerCase()}`}
                                            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                                        >
                                            <div className={`${value.lightBg} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                                                <Icon className={`h-5 w-5 text-${value.color}-600`} />
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                                {key.charAt(0) + key.slice(1).toLowerCase()}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 lg:px-12">
                    By signing in, you agree to our{" "}
                    <a href="#" className="text-green-600 hover:underline">Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
}
