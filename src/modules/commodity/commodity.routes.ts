import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateDTO } from '@middlewares/validate.middleware';
import { CommodityController } from './controllers/commodity.controller';
import {
  CommodityCreateDTO,
  CommodityFindManyDTO,
  CommodityFindUniqueDTO,
  CommodityUpdateDTO,
} from './dtos/commodity-request.dto';
import { authMiddleware, RequestWithUser } from '@middlewares/auth.middleware';
import { TokenPayload } from '@utils/jwt.util';

const router = Router();

router.post('', authMiddleware, validateDTO(CommodityCreateDTO), async (req, res) => {
  const dto = plainToInstance(CommodityCreateDTO, { ...req.body });
  const user = (req as RequestWithUser).user;
  const response = await CommodityController.create(dto, user as TokenPayload);
  res.status(200).json(response);
});

router.get('', validateDTO(CommodityFindManyDTO), async (req, res) => {
  const dto = plainToInstance(CommodityFindManyDTO, req.query);
  const response = await CommodityController.findMany(dto);
  res.status(200).json(response);
});

router.get('/:commodityUuid', validateDTO(CommodityFindUniqueDTO), async (req, res) => {
  const dto = plainToInstance(CommodityFindUniqueDTO, { commodityUuid: req.params.commodityUuid });
  const response = await CommodityController.findUnique(dto);
  res.status(200).json(response);
});

router.patch(
  '/:commodityUuid',
  authMiddleware,
  validateDTO(CommodityUpdateDTO),
  async (req, res) => {
    const dto = plainToInstance(CommodityUpdateDTO, {
      ...req.body,
      commodityUuid: req.params.commodityUuid,
    });
    const user = (req as RequestWithUser).user;
    const response = await CommodityController.update(dto, user as TokenPayload);
    res.status(200).json(response);
  }
);

export default router;
