import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Send, Mic, Sparkles, TrendingUp, AlertCircle, Calendar, Bot, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { toast } from 'sonner';
import { useEffect } from 'react';

const MunafaAI = () => {
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      role: 'ai', 
      text: 'Namaste! Main Munafa hoon, aapka Smart CFO. Aaj aapki dukan kaisi chal rahi hai?',
      time: '09:00 AM'
    },
    {
      id: '2',
      role: 'ai',
      text: 'Today’s Highlights:\n• Total Sales: ₹12,450\n• New Udhaar: ₹1,500\n• 3 Customers overdue today.',
      isInsight: true,
      time: '09:05 AM'
    }
  ]);

  const [input, setInput] = useState('');
  const { isListening, transcript, error, startListening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), role: 'user', text: input, time: 'Now' }]);
    setInput('');
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        text: 'Samajh gaya. Aapka is mahine ka GST ₹4,200 banta hai. Kya main report generate karu?',
        time: 'Now' 
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF6B00] h-10 w-10 rounded-full flex items-center justify-center text-white shadow-md ring-2 ring-orange-100">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Munafa AI</h1>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Online & Thinking</span>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="border-orange-100 text-[#FF6B00] bg-orange-50 gap-1 font-bold">
          <Sparkles className="h-3 w-3" /> AI Insights Active
        </Badge>
      </div>

      <Card className="flex-1 flex flex-col border-orange-100 shadow-xl overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={cn(
                "max-w-[85%] flex flex-col",
                m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "rounded-2xl p-4 text-sm shadow-sm transition-all duration-300",
                m.role === 'user' 
                  ? "bg-[#FF6B00] text-white rounded-tr-none" 
                  : m.isInsight 
                    ? "bg-blue-50 border border-blue-100 text-blue-900 rounded-tl-none" 
                    : "bg-white border text-gray-800 rounded-tl-none"
              )}>
                {m.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                
                {m.isInsight && (
                  <div className="mt-3 pt-3 border-t border-blue-100 flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-[10px] bg-white border-blue-200 text-blue-700">View Sales</Button>
                    <Button variant="outline" size="sm" className="h-7 text-[10px] bg-white border-blue-200 text-blue-700">Remind Customers</Button>
                  </div>
                )}
              </div>
              <span className="text-[8px] text-gray-400 font-medium mt-1 px-1 uppercase tracking-tighter">
                {m.time} {m.role === 'ai' ? '• MUNAFA AI' : '• YOU'}
              </span>
            </div>
          ))}
        </CardContent>

        <CardFooter className="p-4 bg-white border-t">
          <div className="w-full flex gap-2 items-center">
            <Button 
              variant={isListening ? 'destructive' : 'outline'} 
              size="icon" 
              className={cn(
                "rounded-full flex-shrink-0 transition-all duration-300",
                isListening ? "animate-pulse" : "border-orange-100 text-[#FF6B00]"
              )}
              onClick={startListening}
              disabled={isListening}
            >
              {isListening ? <Mic className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <div className="relative flex-1">
              <Input 
                placeholder="Ask Munafa: 'Aaj kitna udhaar diya?'" 
                className="pr-10 bg-gray-50 focus:bg-white transition-all h-12"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 text-[#FF6B00]"
                onClick={handleSend}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'Weekly Summary', icon: Calendar },
          { label: 'Suspicious Activity', icon: AlertCircle },
          { label: 'Profit Analysis', icon: TrendingUp },
        ].map((item) => (
          <Button key={item.label} variant="outline" className="justify-start gap-2 h-10 text-xs border-orange-50 bg-white/50 hover:bg-orange-50 hover:text-[#FF6B00] hover:border-orange-200 text-gray-500 font-medium">
            <item.icon className="h-3 w-3" /> {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MunafaAI;
