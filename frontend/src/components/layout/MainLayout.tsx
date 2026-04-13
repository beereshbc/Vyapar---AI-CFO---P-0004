import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Wallet, 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  Settings, 
  Languages, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('udhaar'), path: '/udhaar', icon: Wallet },
    { name: 'Give', path: '/give-udhaar', icon: PlusCircle },
    { name: t('gst'), path: '/gst', icon: FileText },
    { name: t('ai_chat'), path: '/ai', icon: MessageSquare },
  ];

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'hi', name: 'हिं' },
    { code: 'kn', name: 'ಕೃ' },
    { code: 'mr', name: 'म' },
  ];

  const toggleLanguage = () => {
    const currentIndex = languages.findIndex(l => l.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextIndex].code);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r h-screen sticky top-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#FF6B00]">{t('app_name')}</h2>
          <p className="text-[10px] text-gray-400 font-medium">INDIA'S SMART CFO</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium",
                isActive 
                  ? "bg-[#FF6B00] text-white shadow-md scale-[1.02]" 
                  : "text-gray-600 hover:bg-orange-50 hover:text-[#FF6B00]"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
            {t('settings')}
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Top Bar - Mobile */}
      <header className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <h2 className="text-lg font-bold text-[#FF6B00]">{t('app_name')}</h2>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={toggleLanguage}>
            <Languages className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2 z-50 shadow-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 p-2 transition-all",
              isActive ? "text-[#FF6B00]" : "text-gray-400"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MainLayout;
