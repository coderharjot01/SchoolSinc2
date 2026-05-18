"use client";

import { useState, Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/actions/auth-actions";
import Link from "next/link";
import { Loader2, GraduationCap } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;
        setLoading(true);
        setError("");
        const res = await resetPassword(token, password);
        if (res.success) {
            setSuccess(true);
        } else {
            setError(res.error || "Failed to reset password. The link may have expired.");
        }
        setLoading(false);
    };

    if (!token) {
        return (
            <CardContent className="pt-6">
                <div className="p-4 bg-rose-50 text-rose-800 text-sm rounded-lg border border-rose-200 text-center">
                    Invalid or missing reset token. Please request a new password reset link.
                </div>
                <div className="mt-4 text-center">
                    <Link href="/auth/forgot-password">
                        <Button variant="outline">Request New Link</Button>
                    </Link>
                </div>
            </CardContent>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardContent>
                {success ? (
                    <div className="p-4 bg-emerald-50 text-emerald-800 text-sm rounded-lg border border-emerald-200 text-center">
                        Password successfully updated! You can now log in securely.
                    </div>
                ) : (
                    <div className="space-y-4 pt-2">
                        <Input 
                            type="password" 
                            placeholder="Enter a strong new password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                        {error && <p className="text-sm text-rose-500">{error}</p>}
                    </div>
                )}
            </CardContent>
            <CardFooter>
                {success ? (
                    <Link href="/auth/login" className="w-full">
                        <Button className="w-full bg-slate-900">Go to Login</Button>
                    </Link>
                ) : (
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/20" disabled={loading || !password}>
                        {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                        Update Password
                    </Button>
                )}
            </CardFooter>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 p-4">
            <div className="mb-8 text-center">
                <div className="flex justify-center mb-4">
                    <Link href="/" className="flex flex-col items-center gap-3 text-slate-900 group">
                        <div className="bg-green-600 p-3 rounded-2xl shadow-lg shadow-green-600/20 group-hover:scale-105 transition-transform">
                            <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-xl font-bold">HS21Schools</span>
                    </Link>
                </div>
                <h1 className="text-lg font-medium text-slate-500">Secure Reset</h1>
            </div>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create New Password</CardTitle>
                    <CardDescription>Enter a new password for your account. Make it strong and memorable.</CardDescription>
                </CardHeader>
                <Suspense fallback={<div className="p-8 text-center"><Loader2 className="animate-spin h-8 w-8 mx-auto text-green-600" /></div>}>
                    <ResetPasswordForm />
                </Suspense>
            </Card>
        </div>
    );
}
