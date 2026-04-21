
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { registerUser } from "@/actions/register";

interface SignUpFormProps extends React.ComponentPropsWithoutRef<"div"> {
    role?: "ADMIN" | "FACULTY" | "STUDENT";
}

export default function SignUpForm({
    className,
    role,
    ...props
}: SignUpFormProps) {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData(event.currentTarget);

        try {
            console.log("Submitting registration form...");
            const result = await registerUser(formData);
            console.log("Registration result:", result);

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess("Account created! Redirecting to login...");
                setTimeout(() => {
                    const loginUrl = role ? `/auth/login/${role.toLowerCase()}` : "/auth/login";
                    window.location.href = loginUrl;
                }, 1500);
            }
        } catch (err) {
            console.error("Form Submission Error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {role ? `${role.charAt(0) + role.slice(1).toLowerCase()} Sign Up` : "Sign Up"}
                    </CardTitle>
                    <CardDescription>
                        Create a new account to access HS21Schools
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <div className="grid gap-2">
                                {role ? (
                                    <input type="hidden" name="role" value={role} />
                                ) : (
                                    <>
                                        <Label htmlFor="role">Role</Label>
                                        <Select name="role" defaultValue="STUDENT" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="STUDENT">Student</SelectItem>
                                                <SelectItem value="FACULTY">Faculty</SelectItem>
                                                <SelectItem value="ADMIN">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </>
                                )}
                            </div>

                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            {success && <div className="text-green-500 text-sm">{success}</div>}

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? "Creating account..." : "Sign Up"}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href={role ? `/auth/login/${role.toLowerCase()}` : "/auth/login"} className="underline underline-offset-4">
                                Login
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
