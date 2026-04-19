import express from 'express';
import { createInvoice, getInvoicesCount } from '../controllers/invoiceController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticate, createInvoice);
router.get('/count', authenticate, getInvoicesCount);

export default router;
