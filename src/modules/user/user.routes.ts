import { Router } from 'express';
import { authMiddleware, requireOwnershipOrRole } from 'middlewares/auth.middleware';
import { validateDTO } from 'middlewares/validate.middleware';
import {
  UserChangePasswordDTO,
  UserChangeRoleDTO,
  UserChangeStatusDTO,
  UserCreateDTO,
  UserFindManyDTO,
  UserFindUniqueDTO,
  UserUpdateDTO,
} from './dtos/user-request.dto';
import { UserController } from './controllers/user.controller';
import { plainToInstance } from 'class-transformer';

const router = Router();

router.post(
  '',
  authMiddleware,
  requireOwnershipOrRole({ roles: ['admin'] }),
  validateDTO(UserCreateDTO),
  async (req, res) => {
    const dto = plainToInstance(UserCreateDTO, { ...req.body });
    const response = await UserController.create(dto);
    res.status(200).json(response);
  }
);

router.get(
  '',
  authMiddleware,
  requireOwnershipOrRole({ roles: ['admin'] }),
  validateDTO(UserFindManyDTO),
  async (req, res) => {
    const dto = plainToInstance(UserFindManyDTO, req.query);
    const response = await UserController.findMany(dto);
    res.status(200).json(response);
  }
);

router.get('/:uuid', authMiddleware, validateDTO(UserFindUniqueDTO), async (req, res) => {
  const dto = plainToInstance(UserFindUniqueDTO, { uuid: req.params.uuid });
  const response = await UserController.findUnique(dto);
  res.status(200).json(response);
});

router.patch(
  '/:uuid',
  authMiddleware,
  requireOwnershipOrRole({ roles: ['admin'], allowSelf: true }),
  validateDTO(UserUpdateDTO),
  async (req, res) => {
    const dto = plainToInstance(UserUpdateDTO, { ...req.body, uuid: req.params.uuid });
    const response = await UserController.update(dto);
    res.status(200).json(response);
  }
);

router.patch(
  '/:uuid/password',
  authMiddleware,
  requireOwnershipOrRole({ roles: ['admin'], allowSelf: true }),
  validateDTO(UserChangePasswordDTO),
  async (req, res) => {
    const dto = plainToInstance(UserChangePasswordDTO, { ...req.body, uuid: req.params.uuid });
    const response = await UserController.changePassword(dto);
    return res.status(200).json(response);
  }
);

router.patch(
  '/:uuid/role',
  authMiddleware,
  requireOwnershipOrRole({ roles: ['admin'] }),
  validateDTO(UserChangeRoleDTO),
  async (req, res) => {
    const dto = plainToInstance(UserChangeRoleDTO, { ...req.body, uuid: req.params.uuid });
    const response = await UserController.changeRole(dto);
    return res.status(200).json(response);
  }
);

router.patch(
  '/:uuid/status',
  authMiddleware,
  requireOwnershipOrRole({ roles: ['admin'], allowSelf: true }),
  validateDTO(UserChangeStatusDTO),
  async (req, res) => {
    const dto = plainToInstance(UserChangeStatusDTO, { ...req.body, uuid: req.params.uuid });
    const response = await UserController.changeStatus(dto);
    return res.status(200).json(response);
  }
);

export default router;
