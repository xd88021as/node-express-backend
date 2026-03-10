import { Router } from 'express';
import { authMiddleware, requireAdminOrSelf, requireAdmin } from 'middlewares/auth.middleware';
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

router.post('', authMiddleware, requireAdmin, validateDTO(UserCreateDTO), async (req, res) => {
  const dto = plainToInstance(UserCreateDTO, { ...req.body });
  const response = await UserController.create(dto);
  res.status(200).json(response);
});

router.get('', authMiddleware, requireAdmin, validateDTO(UserFindManyDTO), async (req, res) => {
  const dto = plainToInstance(UserFindManyDTO, req.query);
  const response = await UserController.findMany(dto);
  res.status(200).json(response);
});

router.get('/:userUuid', authMiddleware, validateDTO(UserFindUniqueDTO), async (req, res) => {
  const dto = plainToInstance(UserFindUniqueDTO, { userUuid: req.params.userUuid });
  const response = await UserController.findUnique(dto);
  res.status(200).json(response);
});

router.patch(
  '/:userUuid',
  authMiddleware,
  requireAdminOrSelf,
  validateDTO(UserUpdateDTO),
  async (req, res) => {
    const dto = plainToInstance(UserUpdateDTO, { ...req.body, userUuid: req.params.userUuid });
    const response = await UserController.update(dto);
    res.status(200).json(response);
  }
);

router.patch(
  '/:userUuid/password',
  authMiddleware,
  requireAdminOrSelf,
  validateDTO(UserChangePasswordDTO),
  async (req, res) => {
    const dto = plainToInstance(UserChangePasswordDTO, {
      ...req.body,
      userUuid: req.params.userUuid,
    });
    const response = await UserController.changePassword(dto);
    return res.status(200).json(response);
  }
);

router.patch(
  '/:userUuid/role',
  authMiddleware,
  requireAdmin,
  validateDTO(UserChangeRoleDTO),
  async (req, res) => {
    const dto = plainToInstance(UserChangeRoleDTO, { ...req.body, userUuid: req.params.userUuid });
    const response = await UserController.changeRole(dto);
    return res.status(200).json(response);
  }
);

router.patch(
  '/:userUuid/status',
  authMiddleware,
  requireAdminOrSelf,
  validateDTO(UserChangeStatusDTO),
  async (req, res) => {
    const dto = plainToInstance(UserChangeStatusDTO, {
      ...req.body,
      userUuid: req.params.userUuid,
    });
    const response = await UserController.changeStatus(dto);
    return res.status(200).json(response);
  }
);

export default router;
