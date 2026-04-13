import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/lib/utils';
import { Wallet, Users, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();

  const stats = [
    { title: 'Total Udhaar', value: 85000, icon: Wallet, trend: '+12%', color: 'text-red-600' },
    { title: 'Active Customers', value: 42, icon: Users, trend: '+3', color: 'text-blue-600' },
    { title: 'Invoices (MTD)', value: 128, icon: FileText, trend: '+15%', color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{t('dashboard')}</h1>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-medium">
          13 Apr 2026
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value}
              </div>
              <p className={`text-xs mt-1 font-medium ${stat.color} flex items-center`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
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
            <CardTitle className="text-lg">Munafa's Daily Briefing</CardTitle>
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
