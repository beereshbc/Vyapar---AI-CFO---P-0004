import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import InventoryItem from '../models/InventoryItem';

export const getItems = async (req: AuthRequest, res: Response) => {
  try {
    const items = await InventoryItem.find({ storeId: req.storeId });
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createItem = async (req: AuthRequest, res: Response) => {
  try {
    const { name, stock, price, gstRate, category } = req.body;
    const newItem = new InventoryItem({
      name,
      stock,
      price,
      gstRate,
      category,
      storeId: req.storeId,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStock = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const item = await InventoryItem.findOneAndUpdate(
      { _id: id, storeId: req.storeId },
      { stock },
      { new: true }
    );
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
