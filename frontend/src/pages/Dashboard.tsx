import { Download, Wallet, Users, FileText, ArrowUpRight, ArrowDownRight, Loader2, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { exportToCSV } from '@/lib/exportUtils';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const Dashboard = () => {
  const { t } = useTranslation();

  const [statsData, setStatsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const customers = await api.get('/ledger/customers');
        const totalUdhaar = customers.reduce((acc: number, c: any) => acc + c.currentBalance, 0);
        const invoicesRes = await api.get('/invoices/count');
        const invoicesCount = invoicesRes.count || 0;
        
        setStatsData({
          totalUdhaar,
          activeCustomers: customers.length,
          invoices: invoicesCount,
          rawCustomers: customers.map((c: any) => ({
              Name: c.name,
              Phone: c.phone,
              Balance: c.currentBalance,
              Score: c.creditScore
          }))
        });
      } catch (err: any) {
        toast.error("Dashboard failed to sync.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  const stats = [
    { title: 'Total Udhaar', value: statsData?.totalUdhaar || 0, icon: Wallet, trend: '+0%', color: 'text-red-600', isCurrency: true },
    { title: 'Active Customers', value: statsData?.activeCustomers || 0, icon: Users, trend: 'New', color: 'text-blue-600', isCurrency: false },
    { title: 'Invoices (MTD)', value: statsData?.invoices || 0, icon: FileText, trend: '+0%', color: 'text-green-600', isCurrency: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{t('dashboard')}</h1>
        <div className="flex items-center gap-3">
            <Button 
                variant="outline" 
                size="sm" 
                className="bg-white border-orange-100 text-[#FF6B00] h-9 gap-2 shadow-sm"
                onClick={() => exportToCSV(statsData?.rawCustomers || [], 'Vyapar_Monthly_Report')}
                disabled={isLoading}
            >
                <Download className="h-4 w-4" /> Download Report
            </Button>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-medium">
              {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse border-orange-50 bg-white/50">
              <CardContent className="p-6 h-24 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-orange-200" />
              </CardContent>
            </Card>
          ))
        ) : (
          stats.map((stat, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.isCurrency ? formatCurrency(stat.value) : stat.value}
                </div>
                <p className={`text-xs mt-1 font-medium ${stat.color} flex items-center`}>
                  {stat.trend.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-1" /> : (stat.trend === 'New' ? <TrendingUp className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />)}
                  {stat.trend} {stat.trend === 'New' ? 'registered' : 'from last month'}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="min-h-[300px]">
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 text-center py-12">
              Cash flow chart will appear here
            </div>
          </CardContent>
        </Card>
        <Card className="min-h-[300px]">
          <CardHeader>
            <CardTitle className="text-lg">Aadaya's Daily Briefing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 flex gap-3 italic text-sm text-gray-700">
              <div className="bg-orange-500 h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">M</div>
              "Namaste! Today you have 5 overdue payments. I suggest sending WhatsApp reminders to Raju and Mohan."
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
