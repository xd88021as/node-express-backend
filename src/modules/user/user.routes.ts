import { Router } from 'express';
import { authMiddleware } from 'middlewares/auth.middleware';
import { validateDTO } from 'middlewares/validate.middleware';
import {
  UserChangePasswordDTO,
  UserCreateDTO,
  UserFindManyDTO,
  UserFindUniqueDTO,
  UserUpdateDTO,
} from './dtos/user-request.dto';
import { UserController } from './controllers/user.controller';
import { plainToInstance } from 'class-transformer';
import { checkForbidden } from '@utils/http-error.util';

const router = Router();

router.post('', validateDTO(UserCreateDTO), async (req, res) => {
  const dto = plainToInstance(UserCreateDTO, { ...req.body });
  const resp = await UserController.create(dto);
  res.status(200).json(resp);
});

router.get('', authMiddleware, validateDTO(UserFindManyDTO), async (req, res) => {
  const dto = plainToInstance(UserFindManyDTO, req.query);
  const resp = await UserController.findMany(dto);
  res.status(200).json(resp);
});

router.get('/:uuid', validateDTO(UserFindUniqueDTO), async (req, res) => {
  const dto = plainToInstance(UserFindUniqueDTO, { uuid: req.params.uuid });
  const resp = await UserController.findUnique(dto);
  res.status(200).json(resp);
});

router.patch('/:uuid', authMiddleware, validateDTO(UserUpdateDTO), async (req, res) => {
  const user = (req as any).user;
  const dto = plainToInstance(UserUpdateDTO, { ...req.body, uuid: req.params.uuid });

  const isAdmin = user.role === 'admin';
  const isNormal = user.userUuid === req.params.uuid;

  if (!isAdmin && !isNormal) {
    return res.json({ success: false, message: 'Unauthorized' });
  }

  const resp = await UserController.update(dto);
  res.status(200).json(resp);
});

router.patch(
  '/:uuid/password',
  authMiddleware,
  validateDTO(UserChangePasswordDTO),
  async (req, res) => {
    const user = (req as any).user;
    const dto = plainToInstance(UserChangePasswordDTO, { ...req.body, uuid: req.params.uuid });

    const isAdmin = user.role === 'admin';
    const isSelf = user.userUuid === req.params.uuid;
    checkForbidden(isAdmin || isSelf);

    const resp = await UserController.changePassword(dto);
    return res.status(200).json(resp);
  }
);

export default router;
