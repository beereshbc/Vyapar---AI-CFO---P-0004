import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { api } from '@/lib/api';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    ownerName: 'maanvi',
    email: 'maanvi.13@gmail.com',
    phone: '9986109029',
    storeName: 'Sharma General Store',
    storeAddress: 'Block C, Gagan Vihar, Bangalore, Karnataka',
    gstin: '29AAPFS1234C1Z5',
    businessType: 'Kirana Store',
    aiTone: 'Negotiator',
    autoRemindMinBalance: 500,
    autoRemindOverdueDays: 15,
    opHoursStart: '09:00',
    opHoursEnd: '20:00',
    upiId: 'sharmastore@bharatpe',
    accountNumber: '012345678912345',
    ifscCode: 'HDFC0001234',
    theme: 'Default'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.get('/auth/settings');
        setSettings(prev => ({ ...prev, ...data }));
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await api.put('/auth/settings', settings);
      toast.success('Settings synced to cloud successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'store', name: 'Store Info', icon: Store },
    { id: 'Aadaya', name: 'Aadaya AI', icon: Bot },
    { id: 'banking', name: 'Bank & UPI', icon: Landmark },
    { id: 'appearance', name: 'Appearance', icon: Paintbrush },
    { id: 'notifications', name: 'Alerts', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  if (isLoading) {
    return <div className="p-8 flex justify-center text-gray-500">Loading Configuration...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in transition-all">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-sm text-gray-500">Manage your store and account preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-[#FF6B00] text-white hover:bg-orange-600 transition-all">
          <Save className="h-4 w-4 mr-2" /> {isSaving ? "Saving..." : "Save Changes"}
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
                    <Input value={settings.ownerName} onChange={(e) => updateField('ownerName', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input value={settings.email} onChange={(e) => updateField('email', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input value={settings.phone} disabled className="bg-gray-50" />
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
                  <Input value={settings.storeName} onChange={(e) => updateField('storeName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Physical Address</label>
                  <Input value={settings.storeAddress} onChange={(e) => updateField('storeAddress', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <label className="text-sm font-medium">GSTIN</label>
                    <Input value={settings.gstin} onChange={(e) => updateField('gstin', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Category</label>
                    <Input value={settings.businessType} onChange={(e) => updateField('businessType', e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'Aadaya' && (
            <Card className="animate-in fade-in slide-in-from-right-4 border-orange-200 shadow-md">
              <CardHeader className="bg-orange-50/50 pb-4">
                <CardTitle className="text-xl text-[#FF6B00] flex items-center gap-2">
                  <Bot className="h-5 w-5" /> Aadaya AI & Automation Hub
                </CardTitle>
                <CardDescription>Configure how your AI CFO interacts with your customers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-800">WhatsApp Reminder Tone</label>
                  <p className="text-xs text-gray-500 pb-2">Select Aadaya's personality for recovering Udhaar.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      onClick={() => updateField('aiTone', 'Polite')} 
                      className={cn("border p-4 rounded-xl cursor-pointer flex flex-col gap-1 transition-all", 
                        settings.aiTone === 'Polite' ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "hover:border-blue-300 bg-blue-50/50")}
                    >
                      <span className={cn("font-bold", settings.aiTone === 'Polite' ? "text-blue-700" : "text-gray-600")}>Polite</span>
                      <span className="text-[10px] text-gray-500">Soft, gentle reminders. Great for loyal customers.</span>
                    </div>
                    <div 
                      onClick={() => updateField('aiTone', 'Negotiator')} 
                      className={cn("border p-4 rounded-xl cursor-pointer flex flex-col gap-1 transition-all", 
                        settings.aiTone === 'Negotiator' ? "border-[#FF6B00] bg-orange-50 ring-2 ring-orange-200 shadow-sm" : "hover:border-orange-300 bg-orange-50/50")}
                    >
                      <span className={cn("font-bold", settings.aiTone === 'Negotiator' ? "text-[#FF6B00]" : "text-gray-600")}>Negotiator</span>
                      <span className="text-[10px] text-gray-500">Firm but offers solutions. (Default)</span>
                    </div>
                    <div 
                      onClick={() => updateField('aiTone', 'Strict')} 
                      className={cn("border p-4 rounded-xl cursor-pointer flex flex-col gap-1 transition-all", 
                        settings.aiTone === 'Strict' ? "border-red-500 bg-red-50 ring-2 ring-red-200" : "hover:border-red-300 bg-red-50/50")}
                    >
                      <span className={cn("font-bold", settings.aiTone === 'Strict' ? "text-red-700" : "text-gray-600")}>Strict</span>
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
                         <Input 
                           type="number" 
                           value={settings.autoRemindMinBalance} 
                           onChange={(e) => updateField('autoRemindMinBalance', Number(e.target.value))}
                           className="pl-7 bg-white shadow-sm font-medium" 
                         />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-semibold text-gray-500">Overdue Days Trigger</label>
                       <div className="relative flex items-center">
                         <Input 
                           type="number" 
                           value={settings.autoRemindOverdueDays} 
                           onChange={(e) => updateField('autoRemindOverdueDays', Number(e.target.value))}
                           className="pr-12 bg-white shadow-sm font-medium" 
                         />
                         <span className="absolute right-3 top-2.5 text-gray-400 text-xs font-bold uppercase">days</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-800">Operating Hours</label>
                    <p className="text-[10px] text-gray-500 pb-1">Ensure Aadaya does not message customers late at night.</p>
                  </div>
                  <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-100 w-fit">
                    <Input 
                      type="time" 
                      value={settings.opHoursStart} 
                      onChange={(e) => updateField('opHoursStart', e.target.value)}
                      className="w-[140px] shadow-sm bg-white" 
                    />
                    <span className="text-xs font-bold text-[#FF6B00] uppercase mx-2">to</span>
                    <Input 
                      type="time" 
                      value={settings.opHoursEnd} 
                      onChange={(e) => updateField('opHoursEnd', e.target.value)}
                      className="w-[140px] shadow-sm bg-white" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'banking' && (
            <Card className="animate-in fade-in slide-in-from-right-4 border-green-200 shadow-md">
              <CardHeader className="bg-[#1A7A4A]/5 pb-4">
                <CardTitle className="text-xl text-[#1A7A4A] flex items-center gap-2">
                  <Landmark className="h-5 w-5" /> Bank & UPI Integrations
                </CardTitle>
                <CardDescription>Bind your payment gateways for automated collections.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4 p-5 border border-green-200 bg-white rounded-xl relative overflow-hidden shadow-sm">
                  <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-green-50 to-transparent pointer-events-none"></div>
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Landmark className="h-4 w-4 text-green-700" />
                    </div>
                    <label className="text-sm font-bold text-[#1A7A4A]">Merchant UPI QR Binding</label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary VPA (UPI ID)</label>
                    <Input 
                      value={settings.upiId} 
                      onChange={(e) => updateField('upiId', e.target.value)}
                      className="border-green-300 font-bold bg-green-50 focus:bg-white text-green-900 transition-colors h-12" 
                    />
                  </div>
                  <p className="text-[10px] text-green-700 italic border-l-2 border-green-400 pl-2">Aadaya AI will automatically encode this UPI ID into a scannable QR on all outgoing WhatsApp invoices.</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <label className="text-sm font-bold text-gray-800 pb-2 block w-full">B2B Settlement Preferences (NEFT/RTGS)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Number</label>
                       <Input 
                         type="password" 
                         value={settings.accountNumber} 
                         onChange={(e) => updateField('accountNumber', e.target.value)}
                         className="bg-white shadow-sm font-mono tracking-widest" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">IFSC Code</label>
                       <Input 
                         value={settings.ifscCode} 
                         onChange={(e) => updateField('ifscCode', e.target.value.toUpperCase())}
                         className="uppercase bg-white shadow-sm font-mono tracking-widest" 
                       />
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
                      <button 
                        key={theme} 
                        onClick={() => updateField('theme', theme)}
                        className={cn(
                        "p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                        settings.theme === theme ? "border-[#FF6B00] bg-orange-50 ring-2 ring-orange-200" : "border-gray-100 hover:border-orange-200"
                      )}>
                         <div className={cn(
                           "h-8 w-8 rounded-full",
                           theme === 'Default' ? "bg-[#FF6B00]" : 
                           theme === 'Forest' ? "bg-[#1A7A4A]" :
                           theme === 'Ocean' ? "bg-blue-600" : "bg-gray-400"
                         )}></div>
                         <span className={cn("text-xs font-bold", settings.theme === theme ? "text-[#FF6B00]" : "text-gray-600")}>{theme}</span>
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
                  { title: 'Daily AI Briefing', desc: 'Morning insights from Aadaya at 7:00 AM' },
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


