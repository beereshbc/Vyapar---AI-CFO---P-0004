import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Search, Mic, Filter, Plus, UserCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UdhaarLedger = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const customers = [
    { id: '1', name: 'Raju Yadav', balance: 12000, days: 91, score: 15, status: 'Overdue', suspicious: true },
    { id: '2', name: 'Mohan Lal', balance: 8000, days: 65, score: 22, status: 'Overdue' },
    { id: '3', name: 'Ramesh Kumar', balance: 4500, days: 35, score: 45, status: 'Warning', autopay: true },
    { id: '4', name: 'Sunita Devi', balance: 1200, days: 5, score: 82, status: 'Healthy', autopay: true },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'success';
      case 'Warning': return 'warning';
      case 'Overdue': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('udhaar')} Ledger</h1>
          <p className="text-sm text-gray-500">Managing 42 active credit accounts</p>
        </div>
        <Button onClick={() => navigate('/give-udhaar')} className="bg-[#FF6B00] text-white">
          <Plus className="h-4 w-4 mr-2" /> New Entry
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input className="pl-10 pr-10" placeholder="Search by name 'Ram' or 'Raju'..." />
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 text-[#FF6B00]">
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {['All', 'Overdue', 'AutoPay', 'New', 'Suspicious'].map((f) => (
            <Button 
              key={f} 
              variant={filter === f ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? 'bg-[#FF6B00]' : 'border-orange-100'}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {customers.map((customer) => (
          <Card 
            key={customer.id} 
            className="hover:border-[#FF6B00] transition-colors cursor-pointer group"
            onClick={() => navigate(`/customers/${customer.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B00] font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800 group-hover:text-[#FF6B00] transition-colors">
                        {customer.name}
                      </h3>
                      {customer.suspicious && (
                        <Badge variant="destructive" className="text-[8px] px-1 h-3 uppercase">Suspicious</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant={getStatusColor(customer.status)} className="text-[10px] h-4">
                        {customer.days} days overdue
                      </Badge>
                      {customer.autopay && (
                        <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> AutoPay
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right flex flex-col items-end gap-1">
                  <div className="text-lg font-black text-gray-900">
                    {formatCurrency(customer.balance)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-gray-400">Score:</span>
                    <span className={cn(
                      "text-xs font-bold",
                      customer.score > 70 ? "text-green-600" : customer.score > 30 ? "text-orange-500" : "text-red-600"
                    )}>
                      {customer.score}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[#FF6B00] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default UdhaarLedger;
