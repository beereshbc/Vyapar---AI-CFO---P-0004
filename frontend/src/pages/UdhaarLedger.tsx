import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Search, Mic, Filter, Plus, UserCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import { exportToCSV } from '@/lib/exportUtils';
import { Download } from 'lucide-react';

import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useEffect } from 'react';
import { toast } from 'sonner';

const UdhaarLedger = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { isListening, transcript, error, startListening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await api.get('/ledger/customers');
        setCustomers(data);
      } catch (err: any) {
        toast.error("Could not sync ledger with cloud.");
      } finally {
        setIsLoadingCustomers(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    
    if (filter === 'All') return true;
    if (filter === 'Overdue') return c.currentBalance > 0;  // Has outstanding balance
    if (filter === 'AutoPay') return c.hasAutoPay === true; // Uses correct schema field
    if (filter === 'New') {                                 // Registered within last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(c.createdAt) >= sevenDaysAgo;
    }
    if (filter === 'Suspicious') return c.isSuspicious === true; // Uses correct schema field
    return true;
  });

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
          <p className="text-sm text-gray-500">Managing {customers.length} active credit accounts</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-orange-100 text-[#FF6B00] h-10 gap-2"
            onClick={() => exportToCSV(customers.map(c => ({ Name: c.name, Phone: c.phone, Balance: c.currentBalance })), 'Vyapar_Full_Ledger')}
          >
            <Download className="h-4 w-4" /> Export All
          </Button>
          <Button onClick={() => navigate('/give-udhaar')} className="bg-[#FF6B00] text-white">
            <Plus className="h-4 w-4 mr-2" /> New Entry
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-10 pr-10" 
            placeholder="Search by name 'Ram' or 'Raju'..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2 transition-all duration-300",
              isListening ? "text-red-500 animate-pulse" : "text-[#FF6B00]"
            )}
            onClick={startListening}
            disabled={isListening}
          >
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
        {isLoadingCustomers ? (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="h-12 w-12 border-4 border-orange-200 border-t-[#FF6B00] rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Syncing Ledger...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl border border-dashed border-orange-200">
            <p className="text-gray-400">No customers found in this sector.</p>
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <Card 
              key={customer._id} 
              className="hover:border-[#FF6B00] transition-colors cursor-pointer group"
              onClick={() => navigate(`/customers/${customer._id}`)}
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
                        <Badge variant={getStatusColor(customer.currentBalance > 10000 ? 'Overdue' : 'Healthy')} className="text-[10px] h-4">
                          {customer.currentBalance > 0 ? "Outstanding" : "Settled"}
                        </Badge>
                        {customer.hasAutoPay && (
                          <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> AutoPay
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-col items-end gap-1">
                    <div className="text-lg font-black text-gray-900">
                      {formatCurrency(customer.currentBalance)}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-400">Score:</span>
                      <span className={cn(
                        "text-xs font-bold",
                        customer.creditScore > 70 ? "text-green-600" : customer.creditScore > 30 ? "text-orange-500" : "text-red-600"
                      )}>
                        {customer.creditScore}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[#FF6B00] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default UdhaarLedger;
