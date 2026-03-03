import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateDTO } from '@middlewares/validate.middleware';
import { CommodityController } from './controllers/commodity.controller';
import { CommodityFindManyDTO, CommodityFindUniqueDTO } from './dtos/commodity-request.dto';

const router = Router();

router.get('', validateDTO(CommodityFindManyDTO), async (req, res) => {
  const dto = plainToInstance(CommodityFindManyDTO, req.query);
  const response = await CommodityController.findMany(dto);
  res.status(200).json(response);
});

router.get('/:commodirtUuid', validateDTO(CommodityFindUniqueDTO), async (req, res) => {
  const dto = plainToInstance(CommodityFindUniqueDTO, { commodirtUuid: req.params.commodirtUuid });
  const response = await CommodityController.findUnique(dto);
  res.status(200).json(response);
});

export default router;
