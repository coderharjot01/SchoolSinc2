"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "@/actions/auth-actions";
import Link from "next/link";
import { Loader2, Mail, GraduationCap } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [debugUrl, setDebugUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        const res = await requestPasswordReset(email);
        
        if (res.success) {
            setSuccess(true);
            setDebugUrl(res.debugUrl || "");
        } else {
            setError(res.error || "An error occurred.");
        }
        setLoading(false);
    };

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
                <h1 className="text-lg font-medium text-slate-500">Account Recovery</h1>
            </div>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>Enter your email address and we will send you a secure link to reset your password.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        {success ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-emerald-50 text-emerald-800 text-sm rounded-lg border border-emerald-200 flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    A password reset link has been sent!
                                </div>
                                <div className="p-4 bg-amber-50 text-amber-800 text-sm rounded-lg border border-amber-200 font-mono break-all">
                                    <strong>[DEV MODE SIMULATED EMAIL]:</strong> Click here to reset: 
                                    <br/><br/>
                                    <Link href={debugUrl} className="text-green-600 underline hover:text-green-800 font-semibold">
                                        Secure Reset Link
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Input 
                                    type="email" 
                                    placeholder="Enter your registered email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {error && <p className="text-sm text-rose-500">{error}</p>}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        {!success && (
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/20" disabled={loading || !email}>
                                {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                                Send Reset Link
                            </Button>
                        )}
                        <Link href="/auth/login" className="text-sm text-slate-500 hover:text-slate-700">Back to Login</Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
