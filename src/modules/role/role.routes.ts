import { Router } from 'express';
import { plainToInstance } from 'class-transformer';
import { RoleController } from './controllers/role.controller';
import { RoleCreateDTO, RoleUpdateDTO } from './dtos/role-request.dto';
import { validateDTO } from '@middlewares/validate.middleware';

const router = Router();

router.post('', validateDTO(RoleCreateDTO), async (req, res) => {
  const dto = plainToInstance(RoleCreateDTO, req.body);
  const response = await RoleController.create(dto.name);
  res.status(200).json(response);
});

router.get('', async (req, res) => {
  const response = await RoleController.findMany();
  res.status(200).json(response);
});

router.patch('', validateDTO(RoleUpdateDTO), async (req, res) => {
  const dto = plainToInstance(RoleUpdateDTO, req.body);
  const response = await RoleController.update(dto.targetName, dto.newName);
  res.status(200).json(response);
});

export default router;
