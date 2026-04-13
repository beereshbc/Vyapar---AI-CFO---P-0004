import React, { useState } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onCountryChange?: (code: string) => void;
  className?: string;
}

const countries = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'USA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
];

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, onCountryChange, className }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ''); // Only digits
    
    // Restriction for India: max 10 digits
    if (selectedCountry.code === '+91') {
      val = val.slice(0, 10);
    } else {
      val = val.slice(0, 15); // General max for international
    }
    
    onChange(val);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find(c => c.code === e.target.value);
    if (country) {
      setSelectedCountry(country);
      if (onCountryChange) onCountryChange(country.code);
      // Clear or trim if switching to India
      if (country.code === '+91') {
        onChange(value.slice(0, 10));
      }
    }
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <div className="relative w-[100px] flex-shrink-0">
        <select 
          className="w-full h-10 px-3 pr-8 text-sm border border-input bg-background rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          value={selectedCountry.code}
          onChange={handleCountryChange}
        >
          {countries.map(c => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code}
            </option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <Input
        type="tel"
        placeholder={selectedCountry.code === '+91' ? '9876543210' : 'Phone number'}
        value={value}
        onChange={handlePhoneChange}
        className="flex-1"
      />
    </div>
  );
};
