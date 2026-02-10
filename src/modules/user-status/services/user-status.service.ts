import { UserStatusRepository } from '../repositories/user-status.repository';

export class UserStatusService {
  static async create(name: string) {
    const status = await UserStatusRepository.create(name);
    return status;
  }

  static async findUnique(name: string) {
    const status = await UserStatusRepository.findUnique(name);
    return status;
  }

  static async findMany() {
    const statuses = await UserStatusRepository.findMany();
    return statuses;
  }

  static async update(id: number, name: string) {
    const status = await UserStatusRepository.update(id, name);
    return status;
  }
}
