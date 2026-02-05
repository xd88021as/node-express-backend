import { RoleName } from '@database/entities/role.entity';
import { RoleResponseDTO } from '../dto/role-response.dto';
import { RoleService } from '../services/role.service';

export class RoleController {
  static async create(name: RoleName): Promise<RoleResponseDTO> {
    const newRole = await RoleService.create(name);
    return RoleResponseDTO.generate(newRole);
  }

  static async findMany(): Promise<RoleResponseDTO[]> {
    const roles = await RoleService.findMany();
    return RoleResponseDTO.generate(roles);
  }

  static async update(targetName: RoleName, newName: RoleName): Promise<RoleResponseDTO> {
    const role = await RoleService.findUnique(targetName);
    const newRole = await RoleService.update(role.id, newName);
    return RoleResponseDTO.generate(newRole);
  }
}
