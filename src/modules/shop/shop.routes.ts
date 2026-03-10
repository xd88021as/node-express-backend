import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateDTO } from '@middlewares/validate.middleware';
import { ShopController } from './controllers/shop.controller';
import {
  ShopCreateDTO,
  ShopFindManyDTO,
  ShopFindUniqueDTO,
  ShopUpdateDTO,
} from './dtos/shop-request.dto';
import { authMiddleware, RequestWithUser, requireAdminOrSelf } from '@middlewares/auth.middleware';
import { TokenPayload } from '@utils/jwt.util';

const router = Router();

router.post(
  '',
  authMiddleware,
  requireAdminOrSelf,
  validateDTO(ShopCreateDTO),
  async (req, res) => {
    const dto = plainToInstance(ShopCreateDTO, { ...req.body });
    const response = await ShopController.create(dto);
    res.status(200).json(response);
  }
);

router.get('', validateDTO(ShopFindManyDTO), async (req, res) => {
  const dto = plainToInstance(ShopFindManyDTO, req.query);
  const response = await ShopController.findMany(dto);
  res.status(200).json(response);
});

router.get('/:shopUuid', validateDTO(ShopFindUniqueDTO), async (req, res) => {
  const dto = plainToInstance(ShopFindUniqueDTO, { shopUuid: req.params.shopUuid });
  const response = await ShopController.findUnique(dto);
  res.status(200).json(response);
});

router.patch('/:shopUuid', authMiddleware, validateDTO(ShopUpdateDTO), async (req, res) => {
  const dto = plainToInstance(ShopUpdateDTO, {
    ...req.body,
    shopUuid: req.params.shopUuid,
  });
  const user = (req as RequestWithUser).user;
  const response = await ShopController.update(dto, user as TokenPayload);
  res.status(200).json(response);
});

export default router;
