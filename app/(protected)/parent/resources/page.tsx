"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Video, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";

import { useState, useEffect } from "react";

export default function ParentResourcesPage() {
    const [resources, setResources] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/resources")
            .then(res => res.json())
            .then(data => setResources(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Resources"
                title="Study Resources"
                subtitle="Access your child's notes, assignments, and learning materials"
            />

            <Card>
                <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search resources..."
                                className="pl-8 w-full"
                            />
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto">
                            <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                    <div className="space-y-3">
                        {resources.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors bg-white dark:bg-slate-900 gap-3">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 flex-shrink-0">
                                        {item.type === "Video" ? <Video className="h-5 w-5 sm:h-6 sm:w-6" /> : <FileText className="h-5 w-5 sm:h-6 sm:w-6" />}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-sm sm:text-base line-clamp-2">{item.title}</h4>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <Badge variant="secondary" className="text-xs font-normal">
                                                {item.subject}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">• {item.type}</span>
                                            <span className="text-xs text-muted-foreground">• {item.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-11 sm:pl-0">
                                    <span className="text-xs text-muted-foreground">{item.size}</span>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-8 sm:h-9 text-xs sm:text-sm"
                                        onClick={() => {
                                            if (item.type === "Video") {
                                                window.open(item.url || "https://www.youtube.com", "_blank");
                                            } else {
                                                const link = document.createElement("a");
                                                link.href = item.url;
                                                link.target = "_blank";
                                                if(item.url.startsWith("http")) { link.download = ""; } else {
                                                   link.download = item.title.replace(/ /g, "_") + (item.type === "PDF" ? ".pdf" : ".txt");
                                                }
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }
                                        }}
                                    >
                                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Download
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
