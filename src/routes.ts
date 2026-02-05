import roleRoutes from '@modules/role/role.routes';
import { Router } from 'express';

const router = Router();

router.use('/role', roleRoutes);

export default router;
