import { UserService } from '../services/user.service';
import {
  UserChangePasswordDTO,
  UserCreateDTO,
  UserFindManyDTO,
  UserFindUniqueDTO,
  UserUpdateDTO,
} from '../dtos/user-request.dto';
import { UserResponseDTO } from '../dtos/user-response.dto';
import { RoleService } from '@modules/role/services/role.service';
import { verifyPassword } from '@utils/crypto.util';
import { checkForbidden, checkNotFound } from '@utils/http-error.util';
import { UserStatusService } from '@modules/user-status/services/user-status.service';

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
    const user = await UserService.findUnique(params);
    checkNotFound(user, 'User not found');
    return UserResponseDTO.generate(user);
  }

  static async findMany(params: UserFindManyDTO): Promise<UserResponseDTO[]> {
    const skip = params.page && params.limit ? (params.page - 1) * params.limit : undefined;
    const take = params.limit ?? undefined;
    const users = await UserService.findMany({ ...params, skip, take });
    return UserResponseDTO.generate(users);
  }

  static async update(params: UserUpdateDTO): Promise<UserResponseDTO> {
    const user = await UserService.findUnique({ uuid: params.uuid });
    checkNotFound(user, 'User not found');
    const statusId = params.statusName
      ? (await UserStatusService.findUnique(params.statusName))?.id
      : undefined;
    const roleId = params.roleName
      ? (await RoleService.findUnique(params.roleName))?.id
      : undefined;
    const newUser = await UserService.update(user.id, {
      ...params,
      statusId,
      roleId,
    });
    return UserResponseDTO.generate(newUser);
  }

  static async changePassword(params: UserChangePasswordDTO): Promise<UserResponseDTO> {
    const { uuid, oldPassword, newPassword } = params;
    const user = await UserService.findUnique({ uuid });
    checkNotFound(user, 'User not found');
    const verify = verifyPassword(oldPassword, user.password);
    checkForbidden(verify, 'Wrong password');

    const updatedUser = await UserService.update(user.id, { password: newPassword });
    return UserResponseDTO.generate(updatedUser);
  }
}
