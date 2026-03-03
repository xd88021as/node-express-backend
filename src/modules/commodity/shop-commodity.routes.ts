import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateDTO } from '@middlewares/validate.middleware';
import { authMiddleware, requireOwnershipOrRole } from '@middlewares/auth.middleware';
import { CommodityController } from './controllers/commodity.controller';
import { CommodityCreateDTO, CommodityUpdateDTO } from './dtos/commodity-request.dto';

const router = Router({ mergeParams: true });

router.post(
  '',
  authMiddleware,
  requireOwnershipOrRole({ roles: ['admin'], allowSelf: true }),
  validateDTO(CommodityCreateDTO),
  async (req, res) => {
    const dto = plainToInstance(CommodityCreateDTO, { ...req.body, shopUuid: req.params.shopUuid });
    const response = await CommodityController.create(dto);
    res.status(200).json(response);
  }
);

router.patch(
  '/:commodityUuid',
  authMiddleware,
  requireOwnershipOrRole({ roles: ['admin'], allowSelf: true }),
  validateDTO(CommodityUpdateDTO),
  async (req, res) => {
    const dto = plainToInstance(CommodityUpdateDTO, {
      ...req.body,
      commodityUuid: req.params.commodityUuid,
    });
    const response = await CommodityController.update(dto);
    res.status(200).json(response);
  }
);

export default router;
