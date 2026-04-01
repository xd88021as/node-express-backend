import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateDTO } from '@middlewares/validate.middleware';
import { authMiddleware, RequestWithUser } from '@middlewares/auth.middleware';
import { TokenPayload } from '@utils/jwt.util';
import {
  ShopTranslationCreateDTO,
  ShopTranslationFindManyDTO,
  ShopTranslationUpdateDTO,
} from './dtos/shop-translation-request.dto';
import { ShopTranslationController } from './controllers/shop-translation.controller';

const router = Router();

router.post('', authMiddleware, validateDTO(ShopTranslationCreateDTO), async (req, res) => {
  const dto = plainToInstance(ShopTranslationCreateDTO, { ...req.body });
  const user = (req as RequestWithUser).user;
  const response = await ShopTranslationController.create(dto, user as TokenPayload);
  res.status(200).json(response);
});

router.get('/:shopUuid', validateDTO(ShopTranslationFindManyDTO), async (req, res) => {
  const dto = plainToInstance(ShopTranslationFindManyDTO, {
    ...req.query,
    shopUuid: req.params.shopUuid,
  });
  const response = await ShopTranslationController.findMany(dto);
  res.status(200).json(response);
});

router.patch(
  '/:shopUuid',
  authMiddleware,
  validateDTO(ShopTranslationUpdateDTO),
  async (req, res) => {
    const dto = plainToInstance(ShopTranslationUpdateDTO, {
      ...req.body,
      shopUuid: req.params.shopUuid,
    });
    const user = (req as RequestWithUser).user;
    const response = await ShopTranslationController.update(dto, user as TokenPayload);
    res.status(200).json(response);
  }
);

export default router;
