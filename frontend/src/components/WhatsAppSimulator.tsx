import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Send, CheckCheck, X, Bot, MoreVertical, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface WhatsAppSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  amount: number;
  phoneNumber: string;
}

const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({ isOpen, onClose, customerName, amount, phoneNumber }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setIsTyping(true);
      setIsSent(false);

      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          { 
            id: '1', 
            text: `Namaste ${customerName}! Munafa AI reminder: You have an outstanding udhaar balance of ₹${amount}. Please clear it at your earliest convenience to maintain your high credit score. 🙏`, 
            sender: 'munafa',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, customerName, amount]);

  const handleRealSend = () => {
    setIsSent(true);
    toast.success("Simulation complete! Redirecting to WhatsApp...");
    
    // Auto-WhatsApp redirection
    setTimeout(() => {
      const text = encodeURIComponent(`Namaste ${customerName}! Munafa AI reminder: You have an outstanding udhaar balance of ₹${amount}. Please clear it at your earliest convenience to maintain your high credit score. 🙏`);
      window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="w-full max-w-sm bg-[#E5DDD5] rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-gray-900 h-[600px] flex flex-col relative"
          >
            {/* Status Bar */}
            <div className="bg-[#075E54] h-6 flex  justify-between px-6 items-center text-white text-[10px]">
              <span>9:41</span>
              <div className="flex gap-1">
                 <div className="h-2 w-2 bg-white rounded-full"></div>
                 <div className="h-2 w-2 bg-white/50 rounded-full"></div>
              </div>
            </div>

            {/* Chat Header */}
            <div className="bg-[#075E54] p-3 flex items-center gap-3 text-white">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                {customerName.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm leading-tight">{customerName}</h3>
                <p className="text-[10px] text-white/70">Online</p>
              </div>
              <div className="flex gap-3 px-2">
                <Video className="h-4 w-4" />
                <Phone className="h-4 w-4" />
                <MoreVertical className="h-4 w-4" />
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id} 
                  className="max-w-[85%] bg-white p-2 rounded-lg rounded-tl-none shadow-sm relative group"
                >
                  <p className="text-sm text-gray-800 leading-relaxed pr-8">{msg.text}</p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <span className="text-[9px] text-gray-400">{msg.time}</span>
                    {isSent ? <CheckCheck className="h-3 w-3 text-blue-400" /> : <CheckCheck className="h-3 w-3 text-gray-300" />}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm w-16">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Input */}
            <div className="p-2 bg-[#F0F0F0] flex gap-2 items-center">
              <div className="bg-white rounded-full flex-1 h-10 px-4 flex items-center text-gray-400 text-sm">
                 Type a message...
              </div>
              <Button 
                onClick={handleRealSend}
                disabled={isTyping || isSent}
                className={cn(
                    "rounded-full h-10 w-10 p-0 shadow-lg",
                    isSent ? "bg-blue-500" : "bg-[#128C7E] hover:bg-[#075E54]"
                )}
              >
                <Send className="h-5 w-5 text-white" />
              </Button>
            </div>

            {/* Overlay Banner */}
            {isSent && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-16 inset-x-4 bg-blue-600 text-white p-3 rounded-xl flex items-center gap-3 shadow-xl z-10"
              >
                <Smartphone className="h-6 w-6 animate-pulse" />
                <div>
                  <p className="text-xs font-bold">Munafa Relay Activated</p>
                  <p className="text-[10px] opacity-80">Syncing with real WhatsApp app...</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppSimulator;
