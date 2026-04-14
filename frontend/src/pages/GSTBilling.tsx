import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';
import { Plus, Trash2, Download, Share2, Receipt, Calculator, ChevronRight } from 'lucide-react';

const GSTBilling = () => {
  const [items, setItems] = useState([
    { id: '1', name: 'Basmati Rice 5kg', price: 650, qty: 1, gst: 5 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), name: '', price: 0, qty: 1, gst: 18 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const calculateSubtotal = () => items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const calculateGST = () => items.reduce((sum, item) => sum + (item.price * item.qty * (item.gst / 100)), 0);
  const total = calculateSubtotal() + calculateGST();

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">GST Billing</h1>
          <p className="text-sm text-gray-500">Create tax-compliant invoices in seconds</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Receipt className="h-4 w-4 mr-2" /> Recent Invoices
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-orange-100 shadow-lg">
            <CardHeader className="bg-orange-50/50 pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Calculator className="h-4 w-4 text-[#FF6B00]" />
                Invoice Items
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-3 items-end p-4 bg-gray-50 rounded-lg border border-gray-100 animate-in fade-in slide-in-from-left-2 transition-all">
                    <div className="flex-1 w-full space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Item Name</label>
                      <Input 
                        placeholder="Item name / HSN" 
                        value={item.name}
                        className="bg-white"
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[idx].name = e.target.value;
                          setItems(newItems);
                        }}
                      />
                    </div>
                    <div className="w-24 space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Price</label>
                      <Input 
                        type="number" 
                        value={item.price}
                        className="bg-white"
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[idx].price = Number(e.target.value);
                          setItems(newItems);
                        }}
                      />
                    </div>
                    <div className="w-20 space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Qty</label>
                      <Input 
                        type="number" 
                        value={item.qty}
                        className="bg-white"
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[idx].qty = Number(e.target.value);
                          setItems(newItems);
                        }}
                      />
                    </div>
                    <div className="w-24 space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">GST %</label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                        value={item.gst}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[idx].gst = Number(e.target.value);
                          setItems(newItems);
                        }}
                      >
                        {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                      </select>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-400 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 border-dashed border-gray-300 text-gray-500 hover:text-[#FF6B00] hover:border-[#FF6B00]"
                onClick={addItem}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Next Item
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white border-orange-200 shadow-xl overflow-hidden sticky top-24">
            <CardHeader className="bg-[#1A7A4A] text-white">
              <CardTitle className="text-center text-lg">Billing Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">{formatCurrency(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm pb-4 border-b">
                <span className="text-gray-500">Total GST</span>
                <span className="font-bold text-[#FF6B00]">{formatCurrency(calculateGST())}</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">Grand Total</span>
                <span className="text-3xl font-black text-[#1A7A4A]">{formatCurrency(total)}</span>
              </div>
              
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-[10px] text-orange-800 italic">
                Invoice will include CGST & SGST breakdown automatically.
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-4 bg-gray-50">
              <Button onClick={handleDownload} className="w-full bg-[#FF6B00] text-white font-bold h-12 shadow-lg">
                <Download className="h-4 w-4 mr-2" /> Download PDF
              </Button>
              <Button variant="outline" className="w-full border-[#1A7A4A] text-[#1A7A4A] font-bold h-12">
                <Share2 className="h-4 w-4 mr-2" /> Share on WhatsApp
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-green-100 bg-green-50/30">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">GSTR-1 Ready</p>
                  <p className="text-xs font-black">Monthly Summary</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-green-300" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GSTBilling;
