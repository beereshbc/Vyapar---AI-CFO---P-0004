import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  storeId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No premium session detected.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY') as any;
    req.userId = decoded.userId;
    req.storeId = decoded.storeId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Session expired or invalid token.' });
  }
};
