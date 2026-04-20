import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Customer from '../models/Customer';

export const getInsights = async (req: AuthRequest, res: Response) => {
  try {
    const { message } = req.body;
    
    // Simple business logic mock for "Aadaya AI"
    const overdueCount = await Customer.countDocuments({ storeId: req.storeId, currentBalance: { $gt: 10000 } });
    
    let aiResponse = "I'm analyzing your business data... ";
    
    if (message.toLowerCase().includes('udhaar') || message.toLowerCase().includes('credit')) {
      aiResponse += `You have ${overdueCount} customers with high outstanding balances. I suggest sending a reminder to Raju Yadav first.`;
    } else if (message.toLowerCase().includes('profit') || message.toLowerCase().includes('aadaya')) {
      aiResponse += "Your cash flow is looking healthy this month, but inventory turnover for 'Daily Needs' is slower than last week.";
    } else {
      aiResponse += "How can I help you grow your business today? I can track Udhaar, manage inventory, or analyze your payouts.";
    }

    res.json({ reply: aiResponse });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


