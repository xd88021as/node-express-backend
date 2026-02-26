import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateDTO } from '@middlewares/validate.middleware';
import { authMiddleware, requireOwnershipOrRole } from '@middlewares/auth.middleware';
import { ShopController } from './controllers/shop.controller';
import { ShopCreateDTO, ShopUpdateDTO } from './dtos/shop-request.dto';

const router = Router();

router.post(
  '',
  authMiddleware,
  requireOwnershipOrRole({ roles: ['admin'], allowSelf: true }),
  validateDTO(ShopCreateDTO),
  async (req, res) => {
    const dto = plainToInstance(ShopCreateDTO, { ...req.body, uuid: req.params.uuid });
    const response = await ShopController.create(dto);
    res.status(200).json(response);
  }
);

router.patch(
  '/:shopUuid',
  authMiddleware,
  requireOwnershipOrRole({ roles: ['admin'], allowSelf: true }),
  validateDTO(ShopUpdateDTO),
  async (req, res) => {
    const dto = plainToInstance(ShopUpdateDTO, {
      ...req.body,
      shopUuid: req.params.shopUuid,
    });
    const response = await ShopController.update(dto);
    res.status(200).json(response);
  }
);

export default router;
