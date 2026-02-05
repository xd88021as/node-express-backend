import { checkNotFound } from '@utils/http-error.util';
import { RoleRepository } from '../repositories/role.repository';
import { RoleName } from '@database/entities/role.entity';

export class RoleService {
  static async create(name: RoleName) {
    const role = await RoleRepository.create(name);
    return role;
  }

  static async findUnique(name: RoleName) {
    const role = await RoleRepository.findUnique(name);
    checkNotFound(role, 'Role not found');
    return role;
  }

  static async findMany() {
    const roles = await RoleRepository.findMany();
    return roles;
  }

  static async update(id: number, name: RoleName) {
    const role = await RoleRepository.update(id, name);
    return role;
  }
}
