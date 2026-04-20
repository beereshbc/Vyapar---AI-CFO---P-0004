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

    if (!customer) throw new Error('Customer not found');

    // ─────────────────────────────────────────────
    // AUTO CREDIT SCORING ENGINE
    // ─────────────────────────────────────────────
    let newScore = customer.creditScore;

    if (type === 'Credit') {
      // Udhaar given → score drops
      newScore -= 5;
      if (amount > 2000)  newScore -= 5;  // Large udhaar penalised more
      if (amount > 5000)  newScore -= 10; // Very large udhaar
    } else {
      // Payment received → score improves
      newScore += 10;
      if (amount > 2000)  newScore += 5;  // Rewarded for paying large amounts
    }

    // Extra penalty: high outstanding balance is risky
    if (customer.currentBalance > 5000)  newScore -= 10;
    if (customer.currentBalance > 10000) newScore -= 10;

    // Clamp score between 0–100
    newScore = Math.max(0, Math.min(100, newScore));

    // Auto-flag as Suspicious if score drops below 20
    const isSuspicious = newScore < 20;

    await Customer.findByIdAndUpdate(customerId, { creditScore: newScore, isSuspicious });

    res.status(201).json({
      transaction: newTransaction,
      updatedBalance: customer.currentBalance,
      creditScore: newScore,
      isSuspicious
    });
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
