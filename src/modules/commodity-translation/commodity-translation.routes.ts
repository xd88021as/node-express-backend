import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { authMiddleware, RequestWithUser } from '@middlewares/auth.middleware';
import { validateDTO } from '@middlewares/validate.middleware';
import { TokenPayload } from '@utils/jwt.util';
import { CommodityTranslationController } from './controllers/commodity-translation.controller';
import {
  CommodityTranslationCreateDTO,
  CommodityTranslationFindUniqueDTO,
  CommodityTranslationUpdateDTO,
} from './dtos/commodity-translation-request.dto';

const router = Router();

router.post('', authMiddleware, validateDTO(CommodityTranslationCreateDTO), async (req, res) => {
  const dto = plainToInstance(CommodityTranslationCreateDTO, { ...req.body });
  const user = (req as RequestWithUser).user;
  const response = await CommodityTranslationController.create(dto, user as TokenPayload);
  res.status(200).json(response);
});

router.get('/:commodityUuid', validateDTO(CommodityTranslationFindUniqueDTO), async (req, res) => {
  const dto = plainToInstance(CommodityTranslationFindUniqueDTO, {
    ...req.query,
    commodityUuid: req.params.commodityUuid,
  });
  const response = await CommodityTranslationController.findUnique(dto);
  res.status(200).json(response);
});

router.patch(
  '/:commodityUuid',
  authMiddleware,
  validateDTO(CommodityTranslationUpdateDTO),
  async (req, res) => {
    const dto = plainToInstance(CommodityTranslationUpdateDTO, {
      ...req.body,
      commodityUuid: req.params.commodityUuid,
    });
    const user = (req as RequestWithUser).user;
    const response = await CommodityTranslationController.update(dto, user as TokenPayload);
    res.status(200).json(response);
  }
);

export default router;
