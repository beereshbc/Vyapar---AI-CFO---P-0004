import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Wallet, LogOut, CheckCircle2, AlertCircle, ShoppingBag, ShieldCheck } from 'lucide-react';

const MyUdhaar = () => {
  const customer = {
    name: 'Raju Yadav',
    balance: 12000,
    storeName: 'Sharma General Store',
    status: 'Action Required',
    autopay: false,
    transactions: [
      { id: '1', date: '2026-04-01', description: 'Milk & Bread', amount: 150, type: 'credit' },
      { id: '2', date: '2026-03-28', description: 'Grocery Kit', amount: 2500, type: 'credit' },
    ]
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="bg-[#FF6B00] px-3 py-1 rounded-full text-white text-[10px] font-black tracking-widest uppercase shadow-sm">
            Udhaarist App
          </div>
          <Button variant="ghost" size="sm" onClick={() => window.location.href='/'} className="text-gray-400">
            <LogOut className="h-4 w-4 mr-2" />
          </Button>
        </div>

        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-gray-800">Namaste, {customer.name}</h1>
          <p className="text-sm text-gray-500">Your credit summary at <strong>{customer.storeName}</strong></p>
        </div>

        <Card className="bg-red-600 border-none text-white shadow-xl rotate-1">
          <CardContent className="p-8 text-center space-y-2">
            <p className="text-xs opacity-70 font-medium uppercase tracking-widest">Amount to Pay</p>
            <div className="text-5xl font-black">{formatCurrency(customer.balance)}</div>
            <p className="text-[10px] bg-white/20 inline-block px-3 py-1 rounded-full border border-white/20 mt-4">
              91 Days Overdue
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm text-center">
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <AlertCircle className="h-4 w-4 text-[#FF6B00]" />
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Status</p>
            <p className="text-xs font-black text-red-600">Action Required</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm text-center">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">AutoPay</p>
            <p className="text-xs font-black text-gray-400 italic">Inactive</p>
          </div>
        </div>

        <Button className="w-full bg-[#1A7A4A] hover:bg-[#1A7A4A]/90 text-white h-14 text-lg font-bold shadow-lg">
          Pay Now with UPI
        </Button>

        <Card className="border-orange-50 bg-white/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-[#FF6B00]" />
              Recent Purchases
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {customer.transactions.map((t) => (
              <div key={t.id} className="flex justify-between items-center text-sm border-b border-orange-50/50 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-bold text-gray-800">{t.description}</p>
                  <p className="text-[10px] text-gray-400">{formatDate(t.date)}</p>
                </div>
                <div className="font-black text-red-500">
                  {formatCurrency(t.amount)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <p className="text-[10px] text-center text-gray-400 font-medium px-8 italic">
          "Don't worry! Pay within 7 days to increase your Udhaar Score by +20 points."
        </p>
      </div>
    </div>
  );
};

export default MyUdhaar;
