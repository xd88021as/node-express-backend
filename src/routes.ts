import authRoutes from '@modules/auth/auth.routes';
import roleRoutes from '@modules/role/role.routes';
import userStatusRoutes from '@modules/user-status/user-status.routes';
import userRoutes from '@modules/user/user.routes';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRoutes);
router.use('/role', roleRoutes);
router.use('/user', userRoutes);
router.use('/user-status', userStatusRoutes);

export default router;
