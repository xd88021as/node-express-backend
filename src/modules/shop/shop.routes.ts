import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateDTO } from '@middlewares/validate.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';
import { ShopController } from './controllers/shop.controller';
import { ShopFindManyDTO, ShopFindUniqueDTO } from './dtos/shop-request.dto';

const router = Router();

router.get('', validateDTO(ShopFindManyDTO), async (req, res) => {
  const dto = plainToInstance(ShopFindManyDTO, req.query);
  const response = await ShopController.findMany(dto);
  res.status(200).json(response);
});

router.get('/:uuid', authMiddleware, validateDTO(ShopFindUniqueDTO), async (req, res) => {
  const dto = plainToInstance(ShopFindUniqueDTO, { uuid: req.params.uuid });
  const response = await ShopController.findUnique(dto);
  res.status(200).json(response);
});

export default router;
