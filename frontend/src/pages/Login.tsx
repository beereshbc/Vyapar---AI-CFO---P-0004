import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Smartphone, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ phone, password });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl border-orange-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#FF6B00]">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to manage your store</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-gray-400" />
                Phone Number
              </label>
              <Input 
                type="tel" 
                placeholder="9876543210" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-400" />
                Password
              </label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white">
              Login Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-500">Don't have an account?</p>
            <Button variant="link" className="text-[#1A7A4A] font-bold" onClick={() => navigate('/register')}>
              Register your store in 3 mins
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
