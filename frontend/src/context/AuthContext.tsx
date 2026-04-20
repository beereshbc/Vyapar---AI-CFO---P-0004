import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

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
  registerUser: (userData: any) => Promise<void>;
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

  const registerUser = async (userData: any) => {
    try {
      await api.post('/auth/register', userData);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      const data = await api.post('/auth/login', credentials);
      
      setUser(data.user);
      localStorage.setItem('vyapar_token', data.token);
      localStorage.setItem('vyapar_user', JSON.stringify(data.user));
      
      setIsLoading(false);
      return true;
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err.message || 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vyapar_token');
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
