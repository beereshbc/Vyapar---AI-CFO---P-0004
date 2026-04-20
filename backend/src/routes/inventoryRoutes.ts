import { Router } from 'express';
import { getItems, createItem, updateStock } from '../controllers/inventoryController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/items', getItems);
router.post('/items', createItem);
router.patch('/items/:id/stock', updateStock);

export default router;
