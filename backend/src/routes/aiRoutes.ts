import { Router } from 'express';
import { getInsights } from '../controllers/aiController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/chat', getInsights);

export default router;
