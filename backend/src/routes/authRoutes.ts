import { Router } from 'express';
import { register, login, getSettings, updateSettings, checkPhone } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/check-phone', checkPhone);
router.get('/settings', authenticate, getSettings);
router.put('/settings', authenticate, updateSettings);

export default router;
