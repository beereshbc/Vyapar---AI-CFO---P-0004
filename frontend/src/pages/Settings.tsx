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
  CreditCard
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'store', name: 'Store Info', icon: Store },
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
