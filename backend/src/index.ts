import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Import Routers
import authRoutes from './routes/authRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import ledgerRoutes from './routes/ledgerRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import aiRoutes from './routes/aiRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
const connectDB = async () => {
    let uri = process.env.MONGO_URI || 'mongodb://localhost:27017/vyapar_ai';
    
    try {
        console.log('⏳ Connecting to MongoDB Atlas Cluster...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
        console.log('✅ Connected seamlessly to MongoDB Atlas Cluster');
    } catch (err) {
        console.error('❌ CRITICAL ERROR: Could not connect to MongoDB Atlas!', err);
        console.error('Please ensure your local IP address is whitelisted in your MongoDB Atlas Network Access settings.');
    }
};

connectDB();

// Basic Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Vyapar AI Backend Live', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/ledger', ledgerRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/ai', aiRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
