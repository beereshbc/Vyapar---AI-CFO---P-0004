import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  User, 
  Store, 
  Bell, 
  Shield, 
  Languages, 
  Save, 
  Smartphone, 
  Paintbrush, 
  Smartphone as PhoneIcon,
  CreditCard,
  Bot,
  Landmark
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'store', name: 'Store Info', icon: Store },
    { id: 'munafa', name: 'Munafa AI', icon: Bot },
    { id: 'banking', name: 'Bank & UPI', icon: Landmark },
    { id: 'appearance', name: 'Appearance', icon: Paintbrush },
    { id: 'notifications', name: 'Alerts', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-sm text-gray-500">Manage your store and account preferences</p>
        </div>
        <Button className="bg-[#FF6B00] text-white">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left",
                activeTab === tab.id 
                  ? "bg-orange-100 text-[#FF6B00]" 
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </aside>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card className="animate-in fade-in slide-in-from-right-4">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input defaultValue="Sanjayakumar S H" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input defaultValue="sanjay.hombaradi@gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input defaultValue="+91 98765 43210" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'store' && (
            <Card className="animate-in fade-in slide-in-from-right-4">
              <CardHeader>
                <CardTitle>Store Details</CardTitle>
                <CardDescription>Manage your business identification and address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Store Name</label>
                  <Input defaultValue="Sharma General Store" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Physical Address</label>
                  <Input defaultValue="Block C, Gagan Vihar, Bangalore, Karnataka" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <label className="text-sm font-medium">GSTIN</label>
                    <Input defaultValue="29AAPFS1234C1Z5" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Category</label>
                    <Input defaultValue="Kirana Store" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'munafa' && (
            <Card className="animate-in fade-in slide-in-from-right-4 border-orange-200">
              <CardHeader className="bg-orange-50/50 pb-4">
                <CardTitle className="text-xl text-[#FF6B00]">Munafa AI & Automation Hub</CardTitle>
                <CardDescription>Configure how your AI CFO interacts with your customers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-800">WhatsApp Reminder Tone</label>
                  <p className="text-xs text-gray-500 pb-2">Select Munafa's personality for recovering Udhaar.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border hover:border-blue-300 p-4 rounded-xl cursor-pointer bg-blue-50/50 flex flex-col gap-1 transition-all">
                      <span className="font-bold text-blue-700">Polite</span>
                      <span className="text-[10px] text-gray-500">Soft, gentle reminders. Great for loyal customers.</span>
                    </div>
                    <div className="border-2 border-[#FF6B00] bg-orange-50 p-4 rounded-xl cursor-pointer flex flex-col gap-1 shadow-sm transition-all focus:ring-2 focus:ring-orange-200">
                      <span className="font-bold text-[#FF6B00]">Negotiator</span>
                      <span className="text-[10px] text-gray-500">Firm but offers solutions. (Currently Active)</span>
                    </div>
                    <div className="border hover:border-red-300 p-4 rounded-xl cursor-pointer bg-red-50/50 flex flex-col gap-1 transition-all">
                      <span className="font-bold text-red-700">Strict</span>
                      <span className="text-[10px] text-gray-500">Aggressive timeline demands. Last resort.</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <label className="text-sm font-bold text-gray-800">Auto-Remind Thresholds</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-semibold text-gray-500">Minimum Balance Trigger</label>
                       <div className="relative">
                         <span className="absolute left-3 top-2.5 text-gray-500 font-bold">₹</span>
                         <Input type="number" defaultValue="500" className="pl-7 bg-white shadow-sm" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-semibold text-gray-500">Overdue Days Trigger</label>
                       <div className="relative flex items-center">
                         <Input type="number" defaultValue="15" className="pr-12 bg-white shadow-sm" />
                         <span className="absolute right-3 top-2.5 text-gray-500 text-xs font-medium uppercase">days</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-800">Operating Hours</label>
                    <p className="text-[10px] text-gray-500 pb-1">Ensure Munafa does not message customers late at night.</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input type="time" defaultValue="09:00" className="w-[140px] shadow-sm bg-white" />
                    <span className="text-xs font-bold text-gray-400 uppercase">to</span>
                    <Input type="time" defaultValue="20:00" className="w-[140px] shadow-sm bg-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'banking' && (
            <Card className="animate-in fade-in slide-in-from-right-4 border-green-200">
              <CardHeader className="bg-[#1A7A4A]/5 pb-4">
                <CardTitle className="text-xl text-[#1A7A4A] flex items-center gap-2">
                  <Landmark className="h-5 w-5" /> Bank & UPI Integrations
                </CardTitle>
                <CardDescription>Bind your payment gateways for automated collections.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4 p-4 border border-green-200 bg-white rounded-xl relative overflow-hidden shadow-sm">
                  <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-green-50 to-transparent pointer-events-none"></div>
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <label className="text-sm font-bold text-[#1A7A4A]">Merchant UPI QR Binding</label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary VPA (UPI ID)</label>
                    <Input defaultValue="sharmastore@bharatpe" className="border-green-300 font-bold bg-green-50 focus:bg-white transition-colors" />
                  </div>
                  <p className="text-[10px] text-green-700 italic border-l-2 border-green-300 pl-2">Munafa AI will automatically encode this UPI ID into a scannable QR on all outgoing WhatsApp invoices so your customers can tap and pay instantly.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <label className="text-sm font-bold text-gray-800 border-b pb-2 block w-full border-gray-100">B2B Settlement Preferences (NEFT/RTGS)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Number</label>
                       <Input type="password" defaultValue="012345678912345" className="bg-white shadow-sm" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">IFSC Code</label>
                       <Input defaultValue="HDFC0001234" className="uppercase bg-white shadow-sm" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card className="animate-in fade-in slide-in-from-right-4">
              <CardHeader>
                <CardTitle>Appearance & Theme</CardTitle>
                <CardDescription>Choose how Vyapar AI CFO looks to you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium">Interface Theme</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Default', 'Saffron', 'Forest', 'Ocean'].map((theme) => (
                      <button key={theme} className={cn(
                        "p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                        theme === 'Default' ? "border-[#FF6B00] bg-orange-50" : "border-gray-100 hover:border-orange-200"
                      )}>
                         <div className={cn(
                           "h-8 w-8 rounded-full",
                           theme === 'Default' ? "bg-[#FF6B00]" : 
                           theme === 'Forest' ? "bg-[#1A7A4A]" :
                           theme === 'Ocean' ? "bg-blue-600" : "bg-gray-400"
                         )}></div>
                         <span className="text-xs font-bold">{theme}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="animate-in fade-in slide-in-from-right-4">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control when and how you get alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'New Udhaar Entry', desc: 'Get notified when a new entry is added via QR' },
                  { title: 'AutoPay Triggers', desc: 'Alert when an AutoPay payment is successful or failed' },
                  { title: 'Daily AI Briefing', desc: 'Morning insights from Munafa at 7:00 AM' },
                  { title: 'Legal Escalations', desc: 'Alerts when a customer moves to higher legal stage' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{item.title}</p>
                      <p className="text-[10px] text-gray-500">{item.desc}</p>
                    </div>
                    <div className="h-6 w-11 bg-orange-500 rounded-full flex items-center px-1">
                      <div className="h-4 w-4 bg-white rounded-full ml-auto shadow-sm"></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="animate-in fade-in slide-in-from-right-4">
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
                <CardDescription>Military-grade encryption settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-[#1A7A4A]" />
                    <div>
                      <p className="text-sm font-bold">Field-level Encryption</p>
                      <p className="text-[10px] text-gray-500">AES-256-GCM is currently protecting your PII data.</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 uppercase text-[8px] font-black">Active</Badge>
                </div>
                <Button variant="outline" className="w-full justify-between">
                  Change Password
                  <Smartphone className="h-4 w-4 text-gray-400" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Manage Devices
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
