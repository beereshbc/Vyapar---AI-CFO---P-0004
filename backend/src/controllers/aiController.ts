import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Customer from '../models/Customer';
import Invoice from '../models/Invoice';

// Helper: Format currency
const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// Helper: Get current date boundaries
const todayStart = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };
const todayEnd = ()   => { const d = new Date(); d.setHours(23,59,59,999); return d; };

export const getInsights = async (req: AuthRequest, res: Response) => {
  try {
    const { message } = req.body;
    const storeId = req.storeId;
    const msg = message.toLowerCase();

    // --- Fetch ALL live business data upfront ---
    const customers = await Customer.find({ storeId }).lean();
    const invoicesToday = await Invoice.find({
      storeId,
      createdAt: { $gte: todayStart(), $lte: todayEnd() }
    }).lean();

    // --- Derived metrics ---
    const totalUdhaar        = customers.reduce((s, c) => s + (c.currentBalance || 0), 0);
    const overdueCustomers   = customers.filter(c => c.currentBalance > 0);
    const suspiciousOnes     = customers.filter(c => c.isSuspicious);
    const totalSalesToday    = invoicesToday.reduce((s, inv: any) => s + (inv.total || 0), 0);
    const newUdhaarToday     = customers.filter(c => {
      const created = new Date(c.createdAt as any);
      return created >= todayStart() && created <= todayEnd();
    });

    // ─────────────────────────────────────────
    // INTENT ROUTING — match user query intent
    // ─────────────────────────────────────────

    // 1. Highlights / summary
    if (msg.includes('highlight') || msg.includes('summary') || msg.includes('aaj') || msg.includes('today')) {
      const reply = [
        `📊 *Today's Business Highlights*`,
        `• Total Sales (invoiced): ${fmt(totalSalesToday)}`,
        `• Total Pending Udhaar: ${fmt(totalUdhaar)}`,
        `• Active Customers: ${customers.length}`,
        `• Overdue Customers: ${overdueCustomers.length}`,
        overdueCustomers.length > 0
          ? `• Top overdue: ${overdueCustomers.sort((a,b) => b.currentBalance - a.currentBalance).slice(0,3).map(c => `${c.name} (${fmt(c.currentBalance)})`).join(', ')}`
          : `• No overdue payments! Great going 🎉`,
      ].join('\n');
      return res.json({ reply });
    }

    // 2. Udhaar / credit balance
    if (msg.includes('udhaar') || msg.includes('credit') || msg.includes('pending') || msg.includes('balance')) {
      if (overdueCustomers.length === 0) {
        return res.json({ reply: `✅ Great news! No pending Udhaar at the moment. All customers are clear.` });
      }
      const top = overdueCustomers.sort((a,b) => b.currentBalance - a.currentBalance).slice(0, 5);
      const list = top.map((c, i) => `${i+1}. ${c.name} — ${fmt(c.currentBalance)}`).join('\n');
      return res.json({ reply: `📋 *Pending Udhaar Summary*\nTotal outstanding: ${fmt(totalUdhaar)}\nTop ${top.length} customers:\n${list}\n\nShall I send WhatsApp reminders to them?` });
    }

    // 3. Sales / invoice
    if (msg.includes('sale') || msg.includes('invoice') || msg.includes('billed') || msg.includes('revenue')) {
      const count = invoicesToday.length;
      if (count === 0) {
        return res.json({ reply: `No invoices have been generated today yet. Go to GST Billing to create one!` });
      }
      return res.json({ reply: `🧾 *Sales Report — Today*\nTotal Sales: ${fmt(totalSalesToday)}\nInvoices Generated: ${count}\nAverage Invoice Value: ${fmt(Math.round(totalSalesToday / count))}` });
    }

    // 4. Who has not paid / overdue
    if (msg.includes('overdue') || msg.includes('not paid') || msg.includes('due') || msg.includes('kaun') || msg.includes('who')) {
      if (overdueCustomers.length === 0) {
        return res.json({ reply: `🎉 All customers are paid up! No overdue accounts right now.` });
      }
      const list = overdueCustomers
        .sort((a,b) => b.currentBalance - a.currentBalance)
        .map((c, i) => `${i+1}. ${c.name} (${c.phone}) — ${fmt(c.currentBalance)}`)
        .join('\n');
      return res.json({ reply: `⚠️ *Overdue Customers (${overdueCustomers.length})*\n${list}\n\nTip: Send a WhatsApp reminder from the Udhaar Ledger page.` });
    }

    // 5. Suspicious customers
    if (msg.includes('suspicious') || msg.includes('risk') || msg.includes('fraud') || msg.includes('alert')) {
      if (suspiciousOnes.length === 0) {
        return res.json({ reply: `✅ No suspicious customer activity detected. Your ledger looks clean!` });
      }
      const list = suspiciousOnes.map(c => `• ${c.name} (${c.phone})`).join('\n');
      return res.json({ reply: `🚨 *Suspicious Activity Detected*\n${list}\nI recommend reviewing these accounts before extending more credit.` });
    }

    // 6. Customer count / active
    if (msg.includes('customer') || msg.includes('kitne') || msg.includes('how many')) {
      return res.json({ reply: `👥 *Customer Overview*\n• Total registered customers: ${customers.length}\n• Customers with pending Udhaar: ${overdueCustomers.length}\n• Flagged as suspicious: ${suspiciousOnes.length}` });
    }

    // 7. Profit / trend
    if (msg.includes('profit') || msg.includes('munafa') || msg.includes('trend') || msg.includes('kaise')) {
      return res.json({ reply: `📈 *Business Pulse*\n• Today's invoiced revenue: ${fmt(totalSalesToday)}\n• Outstanding credit given: ${fmt(totalUdhaar)}\n• Net effective cash: ${fmt(totalSalesToday - totalUdhaar)}\n\nTip: Recover Udhaar regularly to improve your cash flow! 💪` });
    }

    // 8. Help / what can you do
    if (msg.includes('help') || msg.includes('kya') || msg.includes('what can')) {
      return res.json({ reply: `🤖 *I'm Aadaya AI — Here's what I can do:*\n• Show today's highlights\n• Report total Udhaar & who owes\n• List overdue customers\n• Summarize today's sales\n• Detect suspicious accounts\n• Give profit overview\n\nJust ask naturally in Hindi or English! 😊` });
    }

    // 9. Default fallback with actual data context
    return res.json({ 
      reply: `Namaste! Here's a quick snapshot:\n• Pending Udhaar: ${fmt(totalUdhaar)}\n• Today's Sales: ${fmt(totalSalesToday)}\n• Customers needing follow-up: ${overdueCustomers.length}\n\nAsk me: "Who has overdue payments?", "What are today's highlights?", or "How are my sales?" 😊`
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
