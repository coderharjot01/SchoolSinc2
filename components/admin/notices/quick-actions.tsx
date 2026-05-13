"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, FileText, FileCheck, DollarSign, Megaphone, AlertTriangle } from "lucide-react";
import { Notice } from "@/app/(protected)/admin/notices/page";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const actions = [
    { id: "exam", label: "Exam Schedule", desc: "Publish the Exam Schedule", icon: GraduationCap, color: "bg-blue-100 text-blue-600", actionText: "Create Schedule", defaultType: "Academic" },
    { id: "result", label: "Result Notice", desc: "Publish the Exam Results and Event Results", icon: FileCheck, color: "bg-emerald-100 text-emerald-600", actionText: "Publish Results", defaultType: "Academic" },
    { id: "general", label: "General Notice", desc: "Publish general updates", icon: FileText, color: "bg-purple-100 text-purple-600", actionText: "Create Notice", defaultType: "General" },
    { id: "fee", label: "Fee Reminder", desc: "Notify about upcoming or pending fees", icon: DollarSign, color: "bg-emerald-100 text-emerald-600", actionText: "Send Reminder", defaultType: "Fee" },
    { id: "event", label: "Event Announcement", desc: "Share details about cultural program", icon: Megaphone, color: "bg-blue-100 text-blue-600", actionText: "Announce Event", defaultType: "Event" },
    { id: "alert", label: "Emergency Alert", desc: "Urgent communication", icon: AlertTriangle, color: "bg-rose-100 text-rose-600", actionText: "Send Alert", defaultType: "Urgent" },
];

interface QuickActionsProps {
    onAddNotice: (notice: Notice) => void;
}

export function QuickActions({ onAddNotice }: QuickActionsProps) {
    const [selectedAction, setSelectedAction] = useState<typeof actions[0] | null>(null);
    const [formData, setFormData] = useState({ title: "", desc: "", audience: "All" });

    const handleOpen = (action: typeof actions[0]) => {
        setSelectedAction(action);
        setFormData({ title: "", desc: "", audience: "All" }); // Reset form
    };

    const handleSubmit = () => {
        if (!selectedAction || !formData.title || !formData.desc) return;

        const newNotice: Notice = {
            title: formData.title,
            desc: formData.desc,
            audience: formData.audience,
            type: selectedAction.defaultType,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            tag: selectedAction.id === "exam" || selectedAction.id === "result" ? "Academic" : undefined,
        };

        onAddNotice(newNotice);
        setSelectedAction(null); // Close dialog
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {actions.map((action, i) => (
                    <Card key={i} className="text-center">
                        <CardContent className="pt-8 pb-8 flex flex-col items-center">
                            <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${action.color}`}>
                                <action.icon className="h-6 w-6" />
                            </div>
                            <h4 className="font-semibold">{action.label}</h4>
                            <p className="text-xs text-muted-foreground mt-1 mb-6 px-4">{action.desc}</p>
                            <Button className="bg-[#0f172a] hover:bg-[#1e293b] h-8 text-xs" onClick={() => handleOpen(action)}>
                                {action.actionText}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={!!selectedAction} onOpenChange={(open) => !open && setSelectedAction(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{selectedAction?.actionText}</DialogTitle>
                        <DialogDescription>
                            Create a new {selectedAction?.label.toLowerCase()} to be displayed on the notice board.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Notice Title</Label>
                            <Input 
                                id="title" 
                                placeholder="E.g. Final Exam Schedule 2025" 
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="desc">Description</Label>
                            <Textarea 
                                id="desc" 
                                placeholder="Write the full notice content here..." 
                                className="resize-none h-24"
                                value={formData.desc}
                                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="audience">Target Audience</Label>
                            <Input 
                                id="audience" 
                                placeholder="E.g. All Students, Class 10" 
                                value={formData.audience}
                                onChange={(e) => setFormData({...formData, audience: e.target.value})}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedAction(null)}>Cancel</Button>
                        <Button 
                            onClick={handleSubmit} 
                            disabled={!formData.title || !formData.desc}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Publish Notice
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
