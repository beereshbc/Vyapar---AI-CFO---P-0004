import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import UdhaarLedger from './pages/UdhaarLedger';
import CustomerDetails from './pages/CustomerDetails';
import MyUdhaar from './pages/MyUdhaar';
import QROnboarding from './pages/QROnboarding';
import GSTBilling from './pages/GSTBilling';
import MunafaAI from './pages/MunafaAI';
import Inventory from './pages/Inventory';
import Payouts from './pages/Payouts';
import Settings from './pages/Settings';
import GiveUdhaar from './pages/GiveUdhaar';
import './i18n/config';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF8F0]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B00]"></div>
    </div>
  );
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <MainLayout>{children}</MainLayout>;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/qr/:id" element={<QROnboarding />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/udhaar" element={
          <ProtectedRoute><UdhaarLedger /></ProtectedRoute>
        } />
        <Route path="/give-udhaar" element={
          <ProtectedRoute><GiveUdhaar /></ProtectedRoute>
        } />
        <Route path="/customers/:id" element={
          <ProtectedRoute><CustomerDetails /></ProtectedRoute>
        } />
        <Route path="/gst" element={
          <ProtectedRoute><GSTBilling /></ProtectedRoute>
        } />
        <Route path="/inventory" element={
          <ProtectedRoute><Inventory /></ProtectedRoute>
        } />
        <Route path="/payouts" element={
          <ProtectedRoute><Payouts /></ProtectedRoute>
        } />
        <Route path="/ai" element={
          <ProtectedRoute><MunafaAI /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        } />

        {/* Customer Route */}
        <Route path="/my-udhaar" element={<MyUdhaar />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
