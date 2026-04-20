import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { phone, password, ownerName, storeName, businessType, storeAddress, countryCode, gstin } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: 'Number already registered. Please login.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      phone,
      password: hashedPassword,
      ownerName,
      storeName,
      businessType,
      storeAddress,
      countryCode,
      gstin,
    });

    await newUser.save();

    res.status(201).json({ message: 'Store registered successfully!' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: 'Number not found. Check again or Register.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // Issue JWT
    const token = jwt.sign(
      { userId: user._id, storeId: user._id }, // For Vyapar, User and Store are linked
      process.env.JWT_SECRET || 'SECRET_KEY',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.ownerName,
        storeName: user.storeName,
        role: 'shopkeeper',
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const checkPhone = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: 'This phone number is already registered. Please login instead.' });
    }
    res.json({ available: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getSettings = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId || req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId || req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const updates = req.body;
    
    // Prevent password/phone updates via settings route for security
    delete updates.password;
    delete updates.phone;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
