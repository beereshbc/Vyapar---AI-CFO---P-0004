import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Package, AlertCircle, TrendingUp, History, Plus, Search, FileText } from 'lucide-react';
import { api } from '@/lib/api';
import { useEffect } from 'react';
import { toast } from 'sonner';

const Inventory = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await api.get('/inventory/items');
        setItems(data);
      } catch (err: any) {
        toast.error("Inventory sync failed.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const stats = {
    total: items.length,
    low: items.filter(i => i.stock > 0 && i.stock < 15).length,
    out: items.filter(i => i.stock === 0).length,
    value: items.reduce((acc, i) => acc + (i.price * i.stock), 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>
          <p className="text-sm text-gray-500">Track stock levels and reorder alerts</p>
        </div>
        <Button className="bg-[#FF6B00] text-white">
          <Plus className="h-4 w-4 mr-2" /> Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', val: stats.total, icon: Package, color: 'text-blue-600' },
          { label: 'Low Stock', val: stats.low, icon: AlertCircle, color: 'text-orange-500' },
          { label: 'Out of Stock', val: stats.out, icon: History, color: 'text-red-600' },
          { label: 'Inventory Value', val: `₹${(stats.value / 1000).toFixed(1)}K`, icon: TrendingUp, color: 'text-green-600' },
        ].map((stat, i) => (
          <Card key={i} className="border-orange-50">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <stat.icon className={cn("h-5 w-5 mb-2", stat.color)} />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-black">{stat.val}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input className="pl-10" placeholder="Search by item name or category..." />
        </div>
        <Button variant="outline" className="border-orange-100"><TrendingUp className="h-4 w-4 mr-2" /> Stock Value</Button>
      </div>

      <Card className="border-orange-100 shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FFF8F0] border-b text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Item Name</th>
                  <th className="px-6 py-4">Current Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Unit Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400 italic">Syncing Inventory Matrix...</td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">Inventory is empty. Add your first item.</td>
                  </tr>
                ) : (
                  items.map((item) => {
                    const status = item.stock === 0 ? 'Out of Stock' : item.stock < 15 ? 'Low Stock' : 'In Stock';
                    return (
                        <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-800">{item.name}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold">{item.stock} units</span>
                              <span className="text-[10px] text-gray-400 font-medium">Category: {item.category}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={getStatusColor(status)} className="h-5 text-[10px] px-2 font-bold uppercase transition-all duration-500">
                              {status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-600">₹{item.price}</td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="sm" className="text-[#FF6B00] hover:bg-orange-50 font-bold text-[10px]">
                              Reorder
                            </Button>
                          </td>
                        </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-100">
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">Munafa's Reorder Suggestion</p>
              <p className="text-[10px] text-gray-500 italic">"Based on sales, I suggest ordering 20 boxes of Fortune Oil today."</p>
            </div>
          </div>
          <Button className="bg-[#1A7A4A] text-white text-xs h-8 px-4">
            <FileText className="h-3 w-3 mr-2" /> Generate Order PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
