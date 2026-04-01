import authRoutes from '@modules/auth/auth.routes';
import commodityTranslationRoutes from '@modules/commodity-translation/commodity-translation.routes';
import commodityRoutes from '@modules/commodity/commodity.routes';
import roleRoutes from '@modules/role/role.routes';
import shopTranslationRoutes from '@modules/shop-translation/shop-translation.routes';
import shopRoutes from '@modules/shop/shop.routes';
import toolRoutes from '@modules/tool/tool.routes';
import userStatusRoutes from '@modules/user-status/user-status.routes';
import userRoutes from '@modules/user/user.routes';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRoutes);
router.use('/commodity-translation', commodityTranslationRoutes);
router.use('/commodity', commodityRoutes);
router.use('/role', roleRoutes);
router.use('/shop', shopRoutes);
router.use('/shop-translation', shopTranslationRoutes);
router.use('/tool', toolRoutes);
router.use('/user-status', userStatusRoutes);
router.use('/user', userRoutes);

export default router;
