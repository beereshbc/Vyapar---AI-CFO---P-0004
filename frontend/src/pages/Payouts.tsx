import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';
import { 
  CreditCard, 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Plus, 
  AlertCircle,
  TrendingUp,
  Download
} from 'lucide-react';

const Payouts = () => {
  const payouts = [
    { id: 'pay_1', date: '2026-04-12', amount: 5400, status: 'Settled', method: 'UPI' },
    { id: 'pay_2', date: '2026-04-11', amount: 8200, status: 'Processing', method: 'Card' },
    { id: 'pay_3', date: '2026-04-10', amount: 1250, status: 'Settled', method: 'UPI' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payout Dashboard</h1>
          <p className="text-sm text-gray-500">Track and manage your Razorpay settlements</p>
        </div>
        <Button className="bg-[#1A7A4A] text-white">
          <Plus className="h-4 w-4 mr-2" /> Generate Payment Link
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-[#1A7A4A] to-[#145d39] text-white border-none shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <CreditCard className="h-32 w-32" />
          </div>
          <CardHeader>
            <CardDescription className="text-white/70 font-bold uppercase tracking-widest text-[10px]">Current Balance</CardDescription>
            <CardTitle className="text-4xl font-black">₹24,850.40</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-medium">
              <Clock className="h-3 w-3" /> 
              Next settlement expected by 9:00 AM tomorrow (T+1)
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-white text-[#1A7A4A] hover:bg-white/90 font-bold">Withdraw Now</Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 font-bold">Details</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          <Card className="border-orange-50 bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Collected (MTD)</p>
                  <p className="text-lg font-black text-gray-800">{formatCurrency(145800)}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-blue-100 text-blue-600 bg-blue-50">+15%</Badge>
            </CardContent>
          </Card>
          <Card className="border-orange-50 bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B00]">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active AutoPay Mandates</p>
                  <p className="text-lg font-black text-gray-800">128 Customers</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-[10px] text-[#FF6B00] font-bold">Manage</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-orange-100 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            Settlement History
          </CardTitle>
          <Button size="sm" variant="outline" className="text-[10px] h-7">
            <Download className="h-3 w-3 mr-1" /> Export CSV
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FFF8F0] border-b text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Settlement ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-gray-800 group-hover:text-[#1A7A4A]">{p.id}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{p.date}</td>
                    <td className="px-6 py-4 font-black">{formatCurrency(p.amount)}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-[10px] font-bold h-5 uppercase">{p.method}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className={cn(
                          "h-2 w-2 rounded-full",
                          p.status === 'Settled' ? "bg-green-600" : "bg-orange-500"
                        )}></span>
                        <span className={p.status === 'Settled' ? "text-green-600" : "text-orange-500"}>{p.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-gray-400 group-hover:text-[#1A7A4A]">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-[#FF6B00] mt-0.5" />
        <div className="text-xs text-orange-950">
          <h4 className="font-bold mb-1">Razorpay Settlement Notice</h4>
          <p>T+1 settlements are processed daily at 9:00 AM IST. For credit card payments, a T+2 settlement cycle applies. Check your Razorpay dashboard for individual transaction breakdown.</p>
        </div>
      </div>
    </div>
  );
};

export default Payouts;
