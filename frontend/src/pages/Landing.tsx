import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-5xl font-bold text-[#FF6B00] mb-4">
          {t('app_name')}
        </h1>
        <p className="text-xl text-gray-700 mb-8 italic">
          "{t('slogan')}"
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
            <h3 className="font-bold text-[#1A7A4A] mb-2">{t('udhaar')} Management</h3>
            <p className="text-sm text-gray-600">Track balance, voice input, and auto-reminders.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
            <h3 className="font-bold text-[#1A7A4A] mb-2">{t('gst')} & Billing</h3>
            <p className="text-sm text-gray-600">Create tax invoices and file reports instantly.</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white min-w-[150px]"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-[#1A7A4A] text-[#1A7A4A] hover:bg-[#1A7A4A]/10 min-w-[150px]"
            onClick={() => navigate('/register')}
          >
            Register Store
          </Button>
        </div>
      </div>
      <div className="mt-16 text-xs text-gray-400">
        Built with ❤️ for Bharat's Store Owners
      </div>
    </div>
  );
};

export default Landing;
