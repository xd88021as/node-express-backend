import { RoleRepository } from '../repositories/role.repository';

export class RoleService {
  static async create(name: string) {
    const role = await RoleRepository.create(name);
    return role;
  }

  static async findUnique(name: string) {
    const role = await RoleRepository.findUnique(name);
    return role;
  }

  static async findMany() {
    const roles = await RoleRepository.findMany();
    return roles;
  }

  static async update(id: number, name: string) {
    const role = await RoleRepository.update(id, name);
    return role;
  }
}
