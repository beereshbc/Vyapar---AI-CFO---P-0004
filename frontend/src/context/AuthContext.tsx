import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  role: 'shopkeeper' | 'customer';
  storeId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<boolean>;
  logout: () => void;
  registerUser: (phone: string, name: string, countryCode?: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock check for existing session
    const savedUser = localStorage.getItem('vyapar_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Seed some mock data if empty
    if (!localStorage.getItem('vyapar_registered_numbers')) {
      localStorage.setItem('vyapar_registered_numbers', JSON.stringify(['9876543210', '8888888888']));
    }
    
    setIsLoading(false);
  }, []);

  const registerUser = (phone: string, name: string, countryCode: string = '+91') => {
    const fullPhone = `${countryCode}${phone}`;
    const registered = JSON.parse(localStorage.getItem('vyapar_registered_numbers') || '[]');
    if (!registered.includes(fullPhone)) {
      registered.push(fullPhone);
      localStorage.setItem('vyapar_registered_numbers', JSON.stringify(registered));
    }
  };

  const login = async (credentials: any) => {
    setIsLoading(true);
    const { phone, countryCode = '+91', password } = credentials;
    const fullPhone = `${countryCode}${phone}`;
    
    const registered = JSON.parse(localStorage.getItem('vyapar_registered_numbers') || '[]');
    const isUserRegistered = registered.includes(fullPhone);
    
    if (!isUserRegistered) {
      setIsLoading(false);
      throw new Error(`Number ${fullPhone} not found... first register!!!!`);
    }

    // Validation: 10 digits for India, 8-15 for international
    const isValidPhone = countryCode === '+91' 
      ? /^\d{10}$/.test(phone) 
      : /^\d{8,15}$/.test(phone);

    if (isValidPhone && password?.length >= 6) {
      const mockUser: User = {
        id: fullPhone,
        name: phone === '9876543210' ? 'Authorized Owner' : 'Shopkeeper',
        role: 'shopkeeper',
        storeId: 'store_123'
      };
      setUser(mockUser);
      localStorage.setItem('vyapar_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      throw new Error(isValidPhone 
        ? 'Invalid password (min 6 chars)' 
        : countryCode === '+91' 
          ? 'Please enter a valid 10-digit Indian phone number' 
          : 'Please enter a valid international phone number');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vyapar_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, registerUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
