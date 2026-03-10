import authRoutes from '@modules/auth/auth.routes';
import commodityRoutes from '@modules/commodity/commodity.routes';
import roleRoutes from '@modules/role/role.routes';
import shopRoutes from '@modules/shop/shop.routes';
import toolRoutes from '@modules/tool/tool.routes';
import userStatusRoutes from '@modules/user-status/user-status.routes';
import userRoutes from '@modules/user/user.routes';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRoutes);
router.use('/commodity', commodityRoutes);
router.use('/role', roleRoutes);
router.use('/shop', shopRoutes);
router.use('/tool', toolRoutes);
router.use('/user-status', userStatusRoutes);
router.use('/user', userRoutes);

export default router;
