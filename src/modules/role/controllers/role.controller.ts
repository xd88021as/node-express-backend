import { checkNotFound } from '@utils/http-error.util';
import { RoleResponseDTO } from '../dto/role-response.dto';
import { RoleService } from '../services/role.service';

export class RoleController {
  static async create(name: string): Promise<RoleResponseDTO> {
    const newRole = await RoleService.create(name);
    return RoleResponseDTO.generate(newRole);
  }

  static async findMany(): Promise<RoleResponseDTO[]> {
    const roles = await RoleService.findMany();
    return RoleResponseDTO.generate(roles);
  }

  static async update(targetName: string, newName: string): Promise<RoleResponseDTO> {
    const role = await RoleService.findUnique(targetName);
    checkNotFound(role, 'Role not found');
    const newRole = await RoleService.update(role.id, newName);
    return RoleResponseDTO.generate(newRole);
  }
}
