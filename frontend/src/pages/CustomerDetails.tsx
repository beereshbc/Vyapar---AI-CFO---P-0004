import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { ArrowLeft, Phone, MapPin, AlertCircle, History, Scale, TrendingUp, TrendingDown } from 'lucide-react';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for Raju Yadav (id: 1)
  const customer = {
    id: '1',
    name: 'Raju Yadav',
    phone: '+91 98765 43210',
    address: 'Block C, Gagan Vihar, Bangalore',
    balance: 12000,
    score: 15,
    stage: 5,
    status: 'Suspicious',
    transactions: [
      { id: 't1', date: '2026-04-01', description: 'Grocery Purchase', amount: 2500, type: 'credit' },
      { id: 't2', date: '2026-03-15', description: 'Monthly Payment', amount: 1000, type: 'debit' },
      { id: 't3', date: '2026-02-28', description: 'Grocery Purchase', amount: 5000, type: 'credit' },
    ]
  };

  const stages = [
    { name: '7 Days', action: 'WhatsApp' },
    { name: '30 Days', action: 'Warning' },
    { name: '60 Days', action: 'Notice' },
    { name: '90 Days', action: 'AutoPay' },
    { name: '1 Year', action: 'Legal' },
  ];

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/udhaar')} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Ledger
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 border-orange-100">
          <CardHeader className="text-center pb-2">
            <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B00] font-bold text-3xl mx-auto mb-4 border-4 border-white shadow-sm">
              {customer.name.charAt(0)}
            </div>
            <CardTitle className="text-xl">{customer.name}</CardTitle>
            <Badge variant="destructive" className="mt-2 uppercase text-[10px] tracking-widest">{customer.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{customer.address}</span>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-end">
                <span className="text-xs text-gray-400 font-medium">Total Balance Due</span>
                <span className="text-2xl font-black text-red-600">{formatCurrency(customer.balance)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score & Legal Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  Udhaar Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-red-600">{customer.score}</div>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-red-600 h-full" style={{ width: `${customer.score}%` }} />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 font-medium italic">
                  Proprietary credit score based on payment history.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase flex items-center gap-2">
                  <Scale className="h-4 w-4 text-[#FF6B00]" />
                  Legal Stage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#FF6B00]">Stage {customer.stage}</span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-tight">Escalation Ladder</span>
                </div>
                <div className="flex gap-1 h-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div 
                      key={s} 
                      className={cn(
                        "flex-1 rounded-sm transition-all duration-500",
                        customer.stage >= s ? "bg-[#FF6B00]" : "bg-gray-100"
                      )} 
                    />
                  ))}
                </div>
                <p className="text-[10px] text-red-600 mt-2 font-bold animate-pulse">
                  <AlertCircle className="h-2 w-2 inline mr-1" />
                  AutoPay trigger attempt failed (91 days)
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="h-5 w-5 text-gray-400" />
                Transaction History
              </CardTitle>
              <Button size="sm" variant="outline" className="text-[10px] h-7">Export Ledger</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.transactions.map((t) => (
                  <div key={t.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-50">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{t.description}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{formatDate(t.date)}</p>
                    </div>
                    <div className={cn(
                      "font-black text-sm",
                      t.type === 'credit' ? "text-red-500" : "text-green-600"
                    )}>
                      {t.type === 'credit' ? '+' : '-'} {formatCurrency(t.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
