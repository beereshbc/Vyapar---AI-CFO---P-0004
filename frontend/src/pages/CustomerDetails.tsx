import { ArrowLeft, Phone, MapPin, AlertCircle, History, Scale, TrendingUp, TrendingDown, Send, Download, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { toast } from 'sonner';
import WhatsAppSimulator from '@/components/WhatsAppSimulator';
import { exportCustomerLedgerPDF } from '@/lib/exportUtils';
import { useAuth } from '@/context/AuthContext';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [customer, setCustomer] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get(`/ledger/customers/${id}`);
        setCustomer(data.customer);
        setTransactions(data.transactions);
      } catch (err: any) {
        toast.error("Cloud link broken. Could not fetch ledger.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="h-12 w-12 text-[#FF6B00] animate-spin" />
        <p className="text-gray-500 font-medium">Syncing Ledger History...</p>
      </div>
    );
  }

  if (!customer) return <div className="p-12 text-center text-gray-500">Customer not found</div>;

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
        <Card className="lg:col-span-1 border-orange-100 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B00] font-bold text-3xl mx-auto mb-4 border-4 border-white shadow-sm">
              {customer.name.charAt(0)}
            </div>
            <CardTitle className="text-xl">{customer.name}</CardTitle>
            <Badge variant="destructive" className="mt-2 uppercase text-[10px] tracking-widest">
              {customer.currentBalance > 10000 ? 'Attention Needed' : 'Healthy'}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{customer.phone || 'No phone'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{customer.address || 'Address not listed'}</span>
            </div>
            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xs text-gray-400 font-medium tracking-tight">Total Balance Due</span>
                <span className="text-2xl font-black text-red-600">{formatCurrency(customer.currentBalance)}</span>
              </div>
              <Button 
                onClick={() => setIsSimulatorOpen(true)}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold gap-2 shadow-lg shadow-green-100"
              >
                <Send className="h-4 w-4" /> Send Reminder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Score & Legal Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center text-sm font-medium text-gray-500 uppercase">
                   <span className="flex items-center gap-2"><TrendingDown className="h-4 w-4 text-red-500" /> Udhaar Score</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-red-600">{customer.creditScore || 52}</div>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-red-600 h-full" style={{ width: `${customer.creditScore || 52}%` }} />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 font-medium italic">
                  Proprietary credit score based on AI-analyzed payment hygiene.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase flex items-center gap-2">
                  <Scale className="h-4 w-4 text-[#FF6B00]" />
                  Legal Escalation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#FF6B00]">Stage {customer.currentBalance > 10000 ? '3' : '1'}</span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-tight">Recovery Ladder</span>
                </div>
                <div className="flex gap-1 h-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div 
                      key={s} 
                      className={cn(
                        "flex-1 rounded-sm transition-all duration-500",
                        (customer.currentBalance > 10000 ? 3 : 1) >= s ? "bg-[#FF6B00]" : "bg-gray-100"
                      )} 
                    />
                  ))}
                </div>
                {customer.currentBalance > 15000 && (
                    <p className="text-[10px] text-red-600 mt-2 font-bold animate-pulse">
                        <AlertCircle className="h-2 w-2 inline mr-1" />
                        AutoPay trigger threshold reached.
                    </p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50 py-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <History className="h-4 w-4 text-gray-400" />
                Transaction History
              </CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-[10px] h-7 gap-1 border-orange-100 text-[#FF6B00] bg-white group"
                onClick={() => exportCustomerLedgerPDF(customer, transactions, user?.name || 'My Store')}
              >
                <Download className="h-3 w-3 group-hover:scale-110 transition-transform" /> Export Ledger
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y max-h-[400px] overflow-y-auto">
                {transactions.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 italic text-sm">No transactions on record.</div>
                ) : (
                    transactions.map((t) => (
                        <div key={t._id} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
                          <div>
                            <p className="text-sm font-bold text-gray-800">{t.description}</p>
                            <p className="text-[10px] text-gray-400 font-medium">{formatDate(t.createdAt)}</p>
                          </div>
                          <div className={cn(
                            "font-black text-sm",
                            t.type === 'Credit' ? "text-red-500" : "text-green-600"
                          )}>
                            {t.type === 'Credit' ? '+' : '-'} {formatCurrency(t.amount)}
                          </div>
                        </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <WhatsAppSimulator 
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        customerName={customer.name}
        amount={customer.currentBalance}
        phoneNumber={customer.phone}
      />
    </div>
  );
};

export default CustomerDetails;
