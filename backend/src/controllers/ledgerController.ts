import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Customer from '../models/Customer';
import Transaction from '../models/Transaction';
import mongoose from 'mongoose';

export const getCustomers = async (req: AuthRequest, res: Response) => {
  try {
    const customers = await Customer.find({ storeId: req.storeId });
    res.json(customers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const { name, phone, initialBalance } = req.body;
    const newCustomer = new Customer({
      name,
      phone,
      currentBalance: initialBalance || 0,
      storeId: req.storeId,
    });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const addTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { customerId, amount, type, description } = req.body;

    // Create transaction record
    const newTransaction = new Transaction({
      customerId,
      amount,
      type,
      description,
    });
    await newTransaction.save();

    // Update customer balance
    const balanceChange = type === 'Credit' ? amount : -amount;
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      { $inc: { currentBalance: balanceChange } },
      { new: true }
    );

    if (!customer) {
      throw new Error('Customer not found');
    }

    res.status(201).json({ transaction: newTransaction, updatedBalance: customer.currentBalance });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getCustomerDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const transactions = await Transaction.find({ customerId: id }).sort({ timestamp: -1 });
    res.json({ customer, transactions });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
