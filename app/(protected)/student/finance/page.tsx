"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    CreditCard,
    QrCode,
    DollarSign,
    Calendar,
    CheckCircle2,
    Clock,
    AlertCircle,
    FileText,
    Download,
    ArrowUpRight,
    TrendingUp,
    Receipt,
    Wallet,
    Sparkles,
    CreditCard as CardIcon
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";

// Mock data
const feeBreakdown = [
    { item: 'Tuition Fee', amount: 45000, paid: 45000, status: 'paid' },
    { item: 'Library Fee', amount: 2500, paid: 2500, status: 'paid' },
    { item: 'Computer Lab', amount: 3000, paid: 3000, status: 'paid' },
    { item: 'Sports Fee', amount: 2000, paid: 0, status: 'pending' },
    { item: 'Exam Fee', amount: 5000, paid: 0, status: 'pending' },
    { item: 'Development Fund', amount: 5000, paid: 0, status: 'upcoming' },
];

const paymentHistory = [
    { id: 'TXN001234', date: 'Dec 01, 2024', amount: 15000, method: 'UPI', status: 'success' },
    { id: 'TXN001189', date: 'Nov 15, 2024', amount: 12500, method: 'Card', status: 'success' },
    { id: 'TXN001145', date: 'Oct 30, 2024', amount: 10000, method: 'Bank', status: 'success' },
    { id: 'TXN001098', date: 'Oct 01, 2024', amount: 13000, method: 'UPI', status: 'success' },
];

const upcomingDues = [
    { title: 'Second Term Fee', amount: 12000, dueDate: 'Dec 20, 2024', daysLeft: 9 },
    { title: 'Annual Exam Fee', amount: 5000, dueDate: 'Jan 15, 2025', daysLeft: 35 },
];

export default function StudentFinance() {
    const totalFee = feeBreakdown.reduce((acc, item) => acc + item.amount, 0);
    const paidAmount = feeBreakdown.reduce((acc, item) => acc + item.paid, 0);
    const pendingAmount = totalFee - paidAmount;
    const paymentPercentage = Math.round((paidAmount / totalFee) * 100);

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Finance"
                title="Fee Payment"
                subtitle="Online payment options and fee details"
            />

            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 shadow-xl border border-purple-400/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 opacity-10 animate-pulse"></div>
                <div className="absolute -right-12 -top-12 h-48 w-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                <div className="absolute -left-12 -bottom-12 h-48 w-48 bg-indigo-900/40 rounded-full blur-3xl"></div>
                
                <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                        <div className="h-14 w-14 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
                            <Sparkles className="h-7 w-7 text-white animate-bounce" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">Fee Payment System Update</h3>
                            <p className="text-purple-100/90 text-sm sm:text-base font-medium mt-1">This function will be live soon. We're enhancing your payment security!</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md">
                        🚀 UPCOMING
                    </Badge>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">Total Annual Fee</p>
                                <p className="text-2xl font-bold">₹{totalFee.toLocaleString()}</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">Amount Paid</p>
                                <p className="text-2xl font-bold text-emerald-600">₹{paidAmount.toLocaleString()}</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">Amount Pending</p>
                                <p className="text-2xl font-bold text-rose-600">₹{pendingAmount.toLocaleString()}</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-rose-100 flex items-center justify-center">
                                <AlertCircle className="h-6 w-6 text-rose-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">Payment Progress</p>
                                <p className="text-2xl font-bold">{paymentPercentage}%</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <Progress value={paymentPercentage} className="mt-3 h-2" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Fee Breakdown & Payment */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Fee Breakdown */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <Receipt className="h-4 w-4 text-blue-500" />
                                    Fee Breakdown
                                </CardTitle>
                                <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                                    <Download className="h-3 w-3" /> Download Receipt
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {feeBreakdown.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-2 w-2 rounded-full ${item.status === 'paid' ? 'bg-emerald-500' :
                                                item.status === 'pending' ? 'bg-amber-500' :
                                                    'bg-slate-300'
                                                }`} />
                                            <div>
                                                <p className="text-sm font-medium">{item.item}</p>
                                                <p className="text-[10px] text-muted-foreground">
                                                    {item.status === 'paid' ? 'Fully Paid' :
                                                        item.status === 'pending' ? 'Payment Due' :
                                                            'Upcoming'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-semibold">₹{item.amount.toLocaleString()}</span>
                                            <Badge className={`text-[10px] ${item.status === 'paid' ? 'bg-emerald-500' :
                                                item.status === 'pending' ? 'bg-amber-500' :
                                                    'bg-slate-400'
                                                }`}>
                                                {item.status === 'paid' ? 'Paid' : item.status === 'pending' ? 'Due' : 'Later'}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                <span className="font-semibold">Total</span>
                                <span className="text-lg font-bold">₹{totalFee.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment History */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-500" />
                                    Payment History
                                </CardTitle>
                                <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600">View All</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {paymentHistory.map((payment, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                                <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">₹{payment.amount.toLocaleString()}</p>
                                                <p className="text-[10px] text-muted-foreground">{payment.date} • {payment.method}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge className="bg-emerald-500 text-[10px]">Success</Badge>
                                            <p className="text-[10px] text-muted-foreground mt-1">{payment.id}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Quick Pay & Upcoming */}
                <div className="space-y-6">
                    {/* Quick Pay Card */}
                    <Card className="overflow-hidden">
                        <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-rose-100">Amount Due</p>
                                    <p className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="text-xs text-rose-100">Due by December 20, 2024</p>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <Button className="w-full bg-[#0f172a] text-white hover:bg-slate-800 h-11 rounded-xl">
                                Pay Now
                            </Button>
                            <div className="text-center">
                                <p className="text-xs text-muted-foreground mb-3">Quick Payment</p>
                                <div className="flex items-center justify-center gap-2">
                                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">₹5,000</Badge>
                                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">₹10,000</Badge>
                                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Full</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Options */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Wallet className="h-4 w-4 text-blue-500" />
                                Payment Methods
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <RadioGroup defaultValue="upi">
                                <div className="flex items-center justify-between border rounded-lg p-3 hover:bg-slate-50 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="upi" id="upi" />
                                        <Label htmlFor="upi" className="text-sm cursor-pointer">UPI Payment</Label>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="text-[10px] font-bold text-green-600">GPay</span>
                                        <span className="text-[10px] font-bold text-purple-600">PhonePe</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border rounded-lg p-3 hover:bg-slate-50 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="card" id="card" />
                                        <Label htmlFor="card" className="text-sm cursor-pointer">Credit/Debit Card</Label>
                                    </div>
                                    <CardIcon className="h-4 w-4 text-slate-400" />
                                </div>
                                <div className="flex items-center justify-between border rounded-lg p-3 hover:bg-slate-50 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="bank" id="bank" />
                                        <Label htmlFor="bank" className="text-sm cursor-pointer">Net Banking</Label>
                                    </div>
                                    <span className="text-[10px] text-slate-500">All Banks</span>
                                </div>
                            </RadioGroup>

                            {/* QR Code Section */}
                            <div className="mt-4 pt-4 border-t">
                                <p className="text-xs text-center text-muted-foreground mb-3">Or scan QR to pay</p>
                                <div className="flex justify-center">
                                    <div className="bg-slate-50 p-4 rounded-xl border relative">
                                        <QrCode className="h-20 w-20 text-slate-800" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Dues */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-amber-500" />
                                Upcoming Dues
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingDues.map((due, i) => (
                                <div key={i} className={`p-3 rounded-lg border ${due.daysLeft <= 10 ? 'border-rose-200 bg-rose-50' : 'border-amber-200 bg-amber-50'}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">{due.title}</span>
                                        <span className="font-bold">₹{due.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px]">
                                        <span className="text-slate-500 flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {due.dueDate}
                                        </span>
                                        <Badge className={`${due.daysLeft <= 10 ? 'bg-rose-500' : 'bg-amber-500'} text-[10px]`}>
                                            {due.daysLeft} days left
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
