import { checkNotFound } from '@utils/http-error.util';
import { UserStatusResponseDTO } from '../dtos/user-status-response.dto';
import { UserStatusService } from '../services/user-status.service';

export class UserStatusController {
  static async create(name: string): Promise<UserStatusResponseDTO> {
    const newUserStatus = await UserStatusService.create(name);
    return UserStatusResponseDTO.generate(newUserStatus);
  }

  static async findMany(): Promise<UserStatusResponseDTO[]> {
    const roles = await UserStatusService.findMany();
    return UserStatusResponseDTO.generate(roles);
  }

  static async update(targetName: string, newName: string): Promise<UserStatusResponseDTO> {
    const userStatus = await UserStatusService.findUnique(targetName);
    checkNotFound(userStatus, 'User Status not found');
    const newUserStatus = await UserStatusService.update(userStatus.id, newName);
    return UserStatusResponseDTO.generate(newUserStatus);
  }
}
