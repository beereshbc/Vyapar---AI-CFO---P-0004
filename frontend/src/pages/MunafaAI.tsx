import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Send, Mic, Sparkles, TrendingUp, AlertCircle, Calendar, Bot, Users } from 'lucide-react';
import { api } from '@/lib/api';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
  isInsight?: boolean;
}

const AadayaAI = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [highlights, setHighlights] = useState<{ totalSales: number; totalUdhaar: number; overdueCount: number } | null>(null);
  const { isListening, transcript, error, startListening } = useSpeechRecognition();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      text: 'Namaste! Main Aadaya hoon, aapka Smart CFO. Fetching your live business data...',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Fetch live highlights on mount
  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const [customers, invoicesRes] = await Promise.all([
          api.get('/ledger/customers'),
          api.get('/invoices/count')
        ]);

        const totalUdhaar = customers.reduce((s: number, c: any) => s + (c.currentBalance || 0), 0);
        const overdueCount = customers.filter((c: any) => c.currentBalance > 0).length;
        const totalSales = 0; // Invoice totals not in count endpoint - shown as count

        setHighlights({ totalSales, totalUdhaar, overdueCount });

        const highlightText = [
          `📊 Today's Live Highlights:`,
          `• Total Pending Udhaar: ${formatCurrency(totalUdhaar)}`,
          `• Active Customers: ${customers.length}`,
          `• Customers with due payments: ${overdueCount}`,
          overdueCount > 0 ? `• Tip: Send reminder to top debtors!` : `• All customers are paid up! 🎉`
        ].join('\n');

        setMessages(prev => [
          prev[0],
          {
            id: '2',
            role: 'ai',
            text: highlightText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isInsight: true
          }
        ]);
      } catch {
        setMessages(prev => [
          prev[0],
          {
            id: '2',
            role: 'ai',
            text: 'Could not fetch live data. Please check your connection and try again.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    };
    fetchHighlights();
  }, []);

  useEffect(() => {
    if (transcript) setInput(prev => prev + (prev ? ' ' : '') + transcript);
  }, [transcript]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const data = await api.post('/ai/chat', { message: text });
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch {
      toast.error('Aadaya AI disconnected. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    { label: 'Weekly Summary',       query: 'Give me today highlights and summary',    icon: Calendar },
    { label: 'Suspicious Activity',  query: 'Show me suspicious customer activity',     icon: AlertCircle },
    { label: 'Profit Analysis',      query: 'Give me profit and sales trend overview',  icon: TrendingUp },
    { label: 'Who owes money?',      query: 'Who has overdue udhaar payments?',         icon: Users },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF6B00] h-10 w-10 rounded-full flex items-center justify-center text-white shadow-md ring-2 ring-orange-100">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">AADAYA AI</h1>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Live Data Connected</span>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="border-orange-100 text-[#FF6B00] bg-orange-50 gap-1 font-bold">
          <Sparkles className="h-3 w-3" /> AI Insights Active
        </Badge>
      </div>

      {/* Chat Window */}
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
                {m.text.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('•') ? 'ml-2' : line.startsWith('📊') || line.startsWith('📋') || line.startsWith('🧾') || line.startsWith('👥') || line.startsWith('📈') || line.startsWith('⚠️') || line.startsWith('🚨') || line.startsWith('🎉') || line.startsWith('✅') || line.startsWith('🤖') ? 'font-bold mb-1' : ''}>
                    {line}
                  </p>
                ))}

                {m.isInsight && (
                  <div className="mt-3 pt-3 border-t border-blue-100 flex gap-2 flex-wrap">
                    <Button
                      variant="outline" size="sm"
                      className="h-7 text-[10px] bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() => sendMessage('Show me all customers with overdue payments')}
                    >
                      Remind Customers
                    </Button>
                    <Button
                      variant="outline" size="sm"
                      className="h-7 text-[10px] bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() => sendMessage('Give me my full sales summary')}
                    >
                      View Sales
                    </Button>
                  </div>
                )}
              </div>
              <span className="text-[8px] text-gray-400 font-medium mt-1 px-1 uppercase tracking-tighter">
                {m.time} {m.role === 'ai' ? '• AADAYA AI' : '• YOU'}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="mr-auto items-start max-w-[85%]">
              <div className="bg-white border text-gray-800 rounded-2xl rounded-tl-none p-4 text-sm shadow-sm flex items-center gap-2">
                <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </CardContent>

        {/* Input */}
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
              <Mic className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Input
                placeholder="Ask: 'Kitna udhaar pending hai?' or 'Who owes money?'"
                className="pr-10 bg-gray-50 focus:bg-white transition-all h-12"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
              />
              <Button
                variant="ghost" size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-[#FF6B00]"
                onClick={() => sendMessage(input)}
                disabled={isTyping}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((item) => (
          <Button
            key={item.label}
            variant="outline"
            className="justify-start gap-2 h-10 text-xs border-orange-50 bg-white/50 hover:bg-orange-50 hover:text-[#FF6B00] hover:border-orange-200 text-gray-500 font-medium"
            onClick={() => sendMessage(item.query)}
            disabled={isTyping}
          >
            <item.icon className="h-3 w-3" /> {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AadayaAI;
