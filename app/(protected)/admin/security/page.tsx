"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { generateTwoFactorSecret, verifyAndEnableTwoFactor, getTwoFactorStatus } from "@/actions/admin-security";
import { ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";

export default function SecurityPage() {
    const [enabled, setEnabled] = useState(false);
    const [setupUrl, setSetupUrl] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getTwoFactorStatus().then(res => {
            setEnabled(res.enabled);
            setLoading(false);
        });
    }, []);

    const handleSetup = async () => {
        setLoading(true);
        const res = await generateTwoFactorSecret();
        if (res.otpauth) setSetupUrl(res.otpauth);
        setLoading(false);
    };

    const handleVerify = async () => {
        setVerifying(true);
        setError("");
        const res = await verifyAndEnableTwoFactor(token);
        if (res.success) {
            setEnabled(true);
            setSetupUrl("");
        } else {
            setError(res.error || "Verification failed");
        }
        setVerifying(false);
    };

    return (
        <div className="space-y-6">
            <PageHeader breadcrumb="Home / Settings / Security" title="Security Settings" subtitle="Manage your account security and two-factor authentication" />
            
            <Card className="max-w-xl">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        {enabled ? <ShieldCheck className="text-emerald-500 h-6 w-6" /> : <ShieldAlert className="text-amber-500 h-6 w-6" />}
                        <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                    </div>
                    <CardDescription>
                        Protect your admin account by requiring a 6-digit code from Google Authenticator every time you log in.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {loading ? (
                        <div className="flex items-center gap-2"><Loader2 className="animate-spin h-4 w-4" /> Loading...</div>
                    ) : enabled ? (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
                            <strong>✅ 2FA is Currently Enabled.</strong> Your account is highly secure.
                        </div>
                    ) : !setupUrl ? (
                        <Button onClick={handleSetup} className="bg-blue-600 hover:bg-blue-700">Set Up 2FA Now</Button>
                    ) : (
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-50 border rounded-lg flex flex-col items-center gap-4">
                                <p className="text-sm text-center font-medium">Scan this QR Code with Google Authenticator or Authy:</p>
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <QRCodeSVG value={setupUrl} size={200} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Verify 6-Digit Code</label>
                                <div className="flex gap-2">
                                    <Input 
                                        placeholder="123456" 
                                        maxLength={6} 
                                        value={token} 
                                        onChange={e => setToken(e.target.value)}
                                        className="text-center tracking-widest font-mono text-lg"
                                    />
                                    <Button onClick={handleVerify} disabled={token.length !== 6 || verifying} className="w-32 bg-slate-900">
                                        {verifying ? <Loader2 className="animate-spin h-4 w-4" /> : "Verify"}
                                    </Button>
                                </div>
                                {error && <p className="text-sm text-rose-500">{error}</p>}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
