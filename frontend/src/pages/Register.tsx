import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Store, User, Briefcase, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { PhoneInput } from '@/components/ui/PhoneInput';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    phone: '',
    countryCode: '+91',
    password: '',
    businessType: ''
  });
  
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);

  const nextStep = async () => {
    if (step === 1 && (!formData.storeName || !formData.storeAddress || !formData.gstin)) {
      toast.error("Please provide your Store Name, Address, and GSTIN.");
      return;
    }
    if (step === 2) {
      if (!formData.ownerName || !formData.phone || !formData.password) {
        toast.error("Please provide Owner Name, Phone, and Password.");
        return;
      }
      
      try {
        setIsCheckingPhone(true);
        // We bypass AuthContext here to make a direct API call without JWT
        const response = await fetch('http://localhost:5000/api/auth/check-phone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: formData.phone })
        });
        
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Phone validation failed");
        }
      } catch (err: any) {
        setIsCheckingPhone(false);
        toast.error(err.message || "This number is already registered.");
        return; // BLOCK moving to step 3!
      }
      setIsCheckingPhone(false);
    }
    setStep(prev => prev + 1);
  };
  const prevStep = () => setStep(prev => prev - 1);

  const handleComplete = async () => {
    if (!formData.phone || !formData.ownerName || !formData.businessType) {
      toast.error("Please provide owner details, phone number and business type.");
      return;
    }
    try {
      await registerUser(formData);
      toast.success("Registration complete! Please login now.");
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message || "Registration failed.");
    }
  };

  const steps = [
    { id: 1, name: 'Store', icon: Store },
    { id: 2, name: 'Owner', icon: User },
    { id: 3, name: 'Business', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center p-6">
      <Card className="w-full max-w-lg shadow-xl border-orange-100 overflow-hidden">
        <div className="bg-[#FF6B00] p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all",
                  step >= s.id ? "bg-white text-[#FF6B00] border-white" : "border-white/30 text-white/50"
                )}>
                  {step > s.id ? <CheckCircle2 className="h-5 w-5" /> : s.id}
                </div>
                <span className={cn("text-xs font-bold", step === s.id ? "opacity-100" : "opacity-50")}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <CardHeader>
          <CardTitle>Register Your Store</CardTitle>
          <CardDescription>Join 50,000+ MSMEs managing their business smartly.</CardDescription>
        </CardHeader>

        <CardContent className="min-h-[300px] py-6">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Name</label>
                <Input 
                  placeholder="e.g. Sharma Kirana Store" 
                  value={formData.storeName}
                  onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Address</label>
                <Input 
                    placeholder="City, State" 
                    value={formData.storeAddress}
                    onChange={(e) => setFormData({...formData, storeAddress: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GSTIN</label>
                <Input 
                    placeholder="29XXXXX..." 
                    value={formData.gstin}
                    onChange={(e) => setFormData({...formData, gstin: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <label className="text-sm font-medium">Owner Name</label>
                <Input 
                  placeholder="Your Full Name" 
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <PhoneInput 
                  value={formData.phone}
                  onChange={(val) => setFormData({...formData, phone: val})}
                  onCountryChange={(code) => setFormData({...formData, countryCode: code})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Set Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <p className="text-sm font-medium mb-2">Select Business Type</p>
              <div className="grid grid-cols-2 gap-3">
                {['Kirana Store', 'Medical Shop', 'General Store', 'Textiles', 'Electronics', 'Others'].map((type) => (
                  <Button 
                    key={type} 
                    variant={formData.businessType === type ? 'default' : 'outline'} 
                    className={cn(
                        "justify-start transition-all",
                        formData.businessType === type ? "bg-[#FF6B00] border-[#FF6B00]" : "hover:border-[#FF6B00] hover:bg-orange-50"
                    )}
                    onClick={() => setFormData({...formData, businessType: type})}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between bg-gray-50 p-6 border-t">
          {step > 1 ? (
            <Button variant="ghost" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Already registered?
            </Button>
          )}

          {step < 3 ? (
            <Button onClick={nextStep} disabled={isCheckingPhone} className="bg-[#FF6B00] text-white">
              {isCheckingPhone ? "Checking..." : "Next Step"} {!isCheckingPhone && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          ) : (
            <Button onClick={handleComplete} className="bg-[#1A7A4A] text-white px-8">
              Complete Registration
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
