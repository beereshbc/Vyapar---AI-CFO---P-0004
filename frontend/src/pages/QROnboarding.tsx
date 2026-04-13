import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, QrCode, Camera, ShieldCheck, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

const QROnboarding = () => {
  const [stage, setStage] = useState(1);

  const nextStage = () => setStage(prev => prev + 1);

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="bg-[#FF6B00] h-16 w-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4 rotate-3">
            <QrCode className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Store Onboarding</h1>
          <p className="text-sm text-gray-500">Register as a customer for Sharma General Store</p>
        </div>

        <Card className="border-orange-100 shadow-xl overflow-hidden">
          <div className="h-2 bg-gray-100 w-full">
            <div 
              className="h-full bg-[#1A7A4A] transition-all duration-500" 
              style={{ width: `${(stage / 4) * 100}%` }}
            />
          </div>

          <CardHeader>
            <CardTitle className="text-lg">
              {stage === 1 && 'Personal Details'}
              {stage === 2 && 'Identity Verification'}
              {stage === 3 && 'UPI AutoPay Setup'}
              {stage === 4 && 'Registration Complete!'}
            </CardTitle>
          </CardHeader>

          <CardContent className="min-h-[250px] flex flex-col justify-center">
            {stage === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <Input placeholder="Your Full Name" />
                <Input placeholder="Mobile Number" type="tel" />
                <Button onClick={nextStage} className="w-full bg-[#FF6B00] text-white">Continue</Button>
              </div>
            )}

            {stage === 2 && (
              <div className="space-y-6 text-center animate-in fade-in zoom-in-95">
                <div className="h-40 w-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                  <Camera className="h-10 w-10 mb-2" />
                  <p className="text-xs">Take a quick selfie for KYC</p>
                </div>
                <Button onClick={nextStage} className="w-full bg-[#FF6B00] text-white">Capture & Proceed</Button>
              </div>
            )}

            {stage === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-xs text-green-800">
                    <strong>Secure Payment:</strong> We use Razorpay for secure UPI AutoPay mandates.
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-white shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-bold">UPI AutoPay</p>
                      <p className="text-[10px] text-gray-500">Auto-deduct when balance {'>'} ₹100</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <Button onClick={nextStage} className="w-full bg-[#1A7A4A] text-white">Enable AutoPay</Button>
              </div>
            )}

            {stage === 4 && (
              <div className="text-center space-y-4 animate-in fade-in zoom-in-95">
                 <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">You're All Set!</h3>
                  <p className="text-sm text-gray-500">You can now take items on Udhaar from this store.</p>
                </div>
                <Button onClick={() => window.location.href='/my-udhaar'} className="w-full bg-[#FF6B00] text-white">Go to My Dashboard</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center gap-8 text-[10px] text-gray-400 font-medium">
          <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Secure KYC</span>
          <span className="flex items-center gap-1"><QrCode className="h-3 w-3" /> Digital Ledger</span>
        </div>
      </div>
    </div>
  );
};

export default QROnboarding;
