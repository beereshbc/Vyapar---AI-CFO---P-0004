import { Router } from 'express';
import { getCustomers, createCustomer, addTransaction, getCustomerDetails } from '../controllers/ledgerController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All ledger routes are protected
router.use(authenticate);

router.get('/customers', getCustomers);
router.post('/customers', createCustomer);
router.get('/customers/:id', getCustomerDetails);
router.post('/transactions', addTransaction);

export default router;
