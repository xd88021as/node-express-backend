import { UserService } from '../services/user.service';
import {
  UserChangePasswordDTO,
  UserChangeRoleDTO,
  UserChangeStatusDTO,
  UserCreateDTO,
  UserFindManyDTO,
  UserFindUniqueDTO,
  UserUpdateDTO,
} from '../dtos/user-request.dto';
import { UserPaginationResponseDTO, UserResponseDTO } from '../dtos/user-response.dto';
import { RoleService } from '@modules/role/services/role.service';
import { verifyPassword } from '@utils/crypto.util';
import { checkForbidden, checkNotFound } from '@utils/http-error.util';
import { UserStatusService } from '@modules/user-status/services/user-status.service';
import { TokenPayload } from '@utils/jwt.util';

export class UserController {
  static async create(params: UserCreateDTO): Promise<UserResponseDTO> {
    const status = await UserStatusService.findUnique(params.statusName);
    checkNotFound(status, 'User status not found');
    const role = await RoleService.findUnique(params.roleName);
    checkNotFound(role, 'Role not found');
    const user = await UserService.create({
      ...params,
      statusId: status.id,
      roleId: role.id,
    });
    return UserResponseDTO.generate(user);
  }

  static async findUnique(params: UserFindUniqueDTO): Promise<UserResponseDTO> {
    const user = await UserService.findUnique({ uuid: params.userUuid });
    checkNotFound(user, 'User not found');
    return UserResponseDTO.generate(user);
  }

  static async findMany(params: UserFindManyDTO): Promise<UserPaginationResponseDTO> {
    const skip = params.page && params.limit ? (params.page - 1) * params.limit : undefined;
    const take = params.limit ?? undefined;
    const { users, total } = await UserService.findMany({ ...params, skip, take });
    return UserPaginationResponseDTO.generate({ users, total });
  }

  static async update(params: UserUpdateDTO, tokenPayload: TokenPayload): Promise<UserResponseDTO> {
    const user = await UserService.findUnique({ uuid: params.userUuid });
    checkNotFound(user, 'User not found');
    if (user.role.name === tokenPayload.roleName) {
      checkForbidden(user.uuid === tokenPayload.userUuid);
    }
    const newUser = await UserService.update(user.id, { ...params });
    return UserResponseDTO.generate(newUser);
  }

  static async changePassword(
    params: UserChangePasswordDTO,
    tokenPayload: TokenPayload
  ): Promise<UserResponseDTO> {
    const user = await UserService.findUnique({ uuid: params.userUuid });
    checkNotFound(user, 'User not found');
    if (user.role.name === tokenPayload.roleName) {
      checkForbidden(user.uuid === tokenPayload.userUuid);
    }
    if (tokenPayload.roleName !== 'admin') {
      const verify = verifyPassword(params.oldPassword, user.password);
      checkForbidden(verify, 'Wrong password');
    }
    const updatedUser = await UserService.update(user.id, { password: params.newPassword });
    return UserResponseDTO.generate(updatedUser);
  }

  static async changeRole(
    params: UserChangeRoleDTO,
    tokenPayload: TokenPayload
  ): Promise<UserResponseDTO> {
    const user = await UserService.findUnique({ uuid: params.userUuid });
    checkNotFound(user, 'User not found');
    const role = await RoleService.findUnique(params.roleName);
    checkNotFound(role, 'Role not found');
    if (user.role.name === tokenPayload.roleName) {
      checkForbidden(user.uuid === tokenPayload.userUuid);
    }
    const newUser = await UserService.update(user.id, { roleId: role.id });
    return UserResponseDTO.generate(newUser);
  }

  static async changeStatus(
    params: UserChangeStatusDTO,
    tokenPayload: TokenPayload
  ): Promise<UserResponseDTO> {
    const user = await UserService.findUnique({ uuid: params.userUuid });
    checkNotFound(user, 'User not found');
    const status = await UserStatusService.findUnique(params.statusName);
    checkNotFound(status, 'Status not found');
    if (user.role.name === tokenPayload.roleName) {
      checkForbidden(user.uuid === tokenPayload.userUuid);
    }
    if (tokenPayload.roleName !== 'admin') {
      checkForbidden(params.password, 'Wrong password');
      const verify = verifyPassword(params.password, user.password);
      checkForbidden(verify, 'Wrong password');
    }
    const newUser = await UserService.update(user.id, { statusId: status.id });
    return UserResponseDTO.generate(newUser);
  }
}
