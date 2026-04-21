"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyPlus, LayoutDashboard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function QuizControlPanel() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <LayoutDashboard className="h-5 w-5 text-purple-500" />
                    Quiz Control Panel
                </CardTitle>
                <CardDescription>Design and deploy new interactive quizzes for your classes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Quiz Title</label>
                        <Input placeholder="E.g. Mid-term Physics Assessment" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Target Class</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10a">Class 10-A</SelectItem>
                                <SelectItem value="10b">Class 10-B</SelectItem>
                                <SelectItem value="9a">Class 9-A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea placeholder="Enter brief instructions for the students..." />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                    <Button variant="outline" onClick={() => window.alert("Quiz saved as draft.")}>Save Draft</Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 gap-2" onClick={() => window.alert("🚀 Quiz published successfully!")}>
                        <CopyPlus className="h-4 w-4" /> Publish Quiz
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
