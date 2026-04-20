import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Mic, Search, User, IndianRupee, MessageSquare, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

const GiveUdhaar = () => {
  const { isListening, transcript, error, startListening } = useSpeechRecognition();
  const [stage, setStage] = useState('input'); // input, confirmation, success
  const [entry, setEntry] = useState({
    customerId: '',
    customer: '',
    amount: '',
    reason: 'General Items'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await api.get('/ledger/customers');
        setCustomers(data);
      } catch (err: any) {
        console.error("Failed to fetch customers");
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (transcript) {
      console.log("Parsing transcript:", transcript);
      const text = transcript.toLowerCase();
      
      // 1. Extract Amount (Handles digits better)
      let amount = '';
      const amountMatch = text.match(/(\d+)/);
      if (amountMatch) {
        amount = amountMatch[1];
      }
      
      // 2. Extract Customer Name & Reason
      let name = '';
      let reason = 'General Items';
      
      // Try to match against existing customers first
      const matchedCustomer = customers.find(c => 
        text.includes(c.name.toLowerCase())
      );
      
      if (matchedCustomer) {
        name = matchedCustomer.name;
        setEntry(prev => ({ ...prev, customerId: matchedCustomer._id }));
      }
      
      // Smart parsing for "Amount for Reason" or "Name ko Amount Reason ke liye"
      // Split by common keywords
      const separators = ['for', 'ko', 'liye', 'against', 'ka', 'ke'];
      let reasonCandidate = '';
      
      for (const sep of separators) {
        if (text.includes(` ${sep} `)) {
           const parts = text.split(` ${sep} `);
           // If "500 for Doodh", parts[1] is reason
           // If "Ramesh ko 500", parts[0] might be name
           reasonCandidate = parts[1].replace(amount, '').trim();
           break;
        }
      }
      
      // If we didn't find a matched customer, try to extract name from text
      if (!name) {
          // Fallback: extract name as the first part if not digits
          const parts = text.split(' ');
          if (parts[0] && isNaN(Number(parts[0]))) {
              name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
          }
      }

      setEntry(prev => ({
        ...prev,
        customer: name || prev.customer,
        amount: amount || prev.amount,
        reason: reasonCandidate || prev.reason
      }));
      
      // Only auto-confirm if we have the critical bits
      if (amount && name) {
        toast.info("Munafa understood! Confirming your entry...");
        setTimeout(() => setStage('confirmation'), 1000);
      }
    }
  }, [transcript, customers]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage('confirmation');
  };

  const handleConfirm = async () => {
    setIsSaving(true);
    try {
      // 1. If customer doesn't exist by ID, we create one (simplification for this demo)
      // In a real app, you'd select an existing ID or explicitly create a new one.
      let targetId = entry.customerId;
      
      if (!targetId) {
        const newCust = await api.post('/ledger/customers', { 
            name: entry.customer, 
            phone: '0000000000', // Placeholder for new quick-add
            initialBalance: 0 
        });
        targetId = newCust._id;
      }

      // 2. Add the transaction
      await api.post('/ledger/transactions', {
        customerId: targetId,
        amount: Number(entry.amount),
        type: 'Credit',
        description: entry.reason
      });

      setStage('success');
    } catch (err: any) {
      toast.error(err.message || "Relay failure: Entry not saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Give Udhaar</h1>
        <p className="text-sm text-gray-500">Add a credit entry quickly via voice or form</p>
      </div>

      {stage === 'input' && (
        <Card className="border-orange-100 shadow-2xl overflow-hidden hover:shadow-orange-200/50 transition-shadow duration-500">
          <CardHeader className="bg-orange-50/50 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Quick Entry</CardTitle>
              <Button 
                variant={isListening ? 'destructive' : 'outline'} 
                size="sm" 
                className={cn(
                  "rounded-full gap-2 transition-all duration-300",
                  isListening && "animate-pulse"
                )}
                onClick={startListening}
                disabled={isListening}
              >
                <Mic className="h-4 w-4" />
                {isListening ? 'Listening...' : 'Use Voice'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            {isListening ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in zoom-in-95">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                  <div className="relative bg-red-500 h-20 w-20 rounded-full flex items-center justify-center shadow-lg shadow-red-500/40">
                    <Mic className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="text-center italic text-gray-400">
                  <p className="text-lg font-medium text-gray-600">"Munafa is listening..."</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest mt-2">Try: "Ramesh 500" or "Doodh 50"</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <User className="h-3 w-3" /> Select Customer
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search customer name..." 
                      className="pl-10 h-12 bg-gray-50/50"
                      value={entry.customer}
                      onChange={(e) => {
                          const val = e.target.value;
                          const existing = customers.find(c => c.name.toLowerCase() === val.toLowerCase());
                          setEntry({...entry, customer: val, customerId: existing?._id || ''});
                      }}
                      required
                    />
                    {entry.customer && !entry.customerId && !isListening && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Badge className="bg-blue-500 text-[10px] uppercase">New Customer</Badge>
                        </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <IndianRupee className="h-3 w-3" /> Amount
                    </label>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="h-12 bg-gray-50/50 text-xl font-black"
                      value={entry.amount}
                      onChange={(e) => setEntry({...entry, amount: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare className="h-3 w-3" /> Reason / Items
                    </label>
                    <Input 
                      placeholder="e.g. Doodh, Bread" 
                      className="h-12 bg-gray-50/50"
                      value={entry.reason}
                      onChange={(e) => setEntry({...entry, reason: e.target.value})}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#FF6B00] text-white h-14 text-lg font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                  Next Step <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      {stage === 'confirmation' && (
        <Card className="border-[#1A7A4A]/20 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <CardHeader className="bg-[#1A7A4A] text-white text-center py-8">
            <CardTitle className="text-2xl font-black mb-1">Confirm Entry</CardTitle>
            <CardDescription className="text-white/70">Verify the details before saving to ledger</CardDescription>
          </CardHeader>
          <CardContent className="py-10 space-y-8">
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Giving Credit To</span>
              <h3 className="text-2xl font-black text-gray-800">{entry.customer || 'Ramesh Kumar'}</h3>
            </div>
            
            <div className="bg-gray-50 border rounded-2xl p-8 flex flex-col items-center gap-2 shadow-inner">
               <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Amount Due</span>
               <div className="text-6xl font-black text-[#FF6B00]">₹{entry.amount || '10'}</div>
               <span className="text-sm font-medium text-gray-500 mt-2 px-4 py-1 bg-white rounded-full border shadow-sm">
                Reason: {entry.reason}
               </span>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-14 border-red-100 text-red-500 hover:bg-red-50 gap-2" onClick={() => setStage('input')}>
                <XCircle className="h-5 w-5" /> Cancel
              </Button>
              <Button className="flex-1 h-14 bg-[#1A7A4A] text-white gap-2 shadow-lg shadow-green-200" onClick={handleConfirm} disabled={isSaving}>
                {isSaving ? (
                    <span className="flex items-center gap-2 animate-pulse">Syncing...</span>
                ) : (
                    <>
                        <CheckCircle2 className="h-5 w-5" /> Confirm Save
                    </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {stage === 'success' && (
        <div className="text-center space-y-8 animate-in zoom-in-95 duration-500 flex flex-col items-center py-12">
          <div className="relative">
             <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping scale-150"></div>
             <div className="relative bg-[#1A7A4A] h-32 w-32 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30">
                <CheckCircle2 className="h-16 w-16 text-white" />
             </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-800">Entry Saved!</h2>
            <p className="text-gray-500">Udhaar entry has been added to <strong>{entry.customer}</strong>'s ledger successfully.</p>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-sm">
             <Button className="bg-[#FF6B00] text-white h-12 font-bold" onClick={() => setStage('input')}>
                Add Another Entry
             </Button>
             <Button variant="outline" className="h-12" onClick={() => navigate('/udhaar')}>
                View Ledger
             </Button>
          </div>
        </div>
      )}

      <p className="text-[10px] text-center text-gray-400 font-medium px-12 leading-relaxed">
        Munafa AI Tip: If you use voice input, ensure you mention the name and exact item for better GST classification.
      </p>
    </div>
  );
};

export default GiveUdhaar;
