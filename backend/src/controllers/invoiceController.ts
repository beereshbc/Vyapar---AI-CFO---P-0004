import { Request, Response } from 'express';
import Invoice from '../models/Invoice';

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { items, subtotal, gstAmount, total } = req.body;
    
    // AuthMiddleware usually sets req.user (we use userId as storeId globally here for simplicty)
    // @ts-ignore
    const storeId = req.user?.storeId;

    if (!storeId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const newInvoice = new Invoice({
      storeId,
      items,
      subtotal,
      gstAmount,
      total
    });

    await newInvoice.save();

    res.status(201).json(newInvoice);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getInvoicesCount = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const storeId = req.user?.storeId;

    if (!storeId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Getting the count of invoices created in the current month (MTD)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const count = await Invoice.countDocuments({
      storeId,
      createdAt: { $gte: startOfMonth }
    });

    res.json({ count });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
