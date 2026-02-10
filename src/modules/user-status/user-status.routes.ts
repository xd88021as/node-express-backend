import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserStatusController } from './controllers/user-status.controller';
import { UserStatusCreateDTO, UserStatusUpdateDTO } from './dtos/user-status-request.dto';
import { validateDTO } from '@middlewares/validate.middleware';

const router = Router();

router.post('', validateDTO(UserStatusCreateDTO), async (req, res) => {
  const dto = plainToInstance(UserStatusCreateDTO, req.body);
  const response = await UserStatusController.create(dto.name);
  res.status(200).json(response);
});

router.get('', async (req, res) => {
  const response = await UserStatusController.findMany();
  res.status(200).json(response);
});

router.patch('', validateDTO(UserStatusUpdateDTO), async (req, res) => {
  const dto = plainToInstance(UserStatusUpdateDTO, req.body);
  const response = await UserStatusController.update(dto.targetName, dto.newName);
  res.status(200).json(response);
});

export default router;
