import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateDTO } from '@middlewares/validate.middleware';
import { ToolController } from './controllers/tool.controller';
import { ToolCryptoDTO } from './dtos/tool-request.dto';

const router = Router();

router.post('/crypto', validateDTO(ToolCryptoDTO), async (req, res) => {
  const dto = plainToInstance(ToolCryptoDTO, req.body);
  const response = await ToolController.crypto(dto);
  res.status(200).json(response);
});

export default router;
