import { AppDataSource } from '@database/data-source';
import { RoleEntity, RoleName } from '@database/entities/role.entity';

const repo = AppDataSource.getRepository(RoleEntity);

export class RoleRepository {
  static async create(name: RoleName) {
    const entity = repo.create({ name });
    const savedEntity = await repo.save(entity);
    return savedEntity;
  }

  static async findUnique(name: RoleName) {
    const entity = await repo.findOne({ where: { name } });
    return entity || null;
  }

  static async findMany() {
    const query = await repo.find();
    return query;
  }

  static async update(id: number, name: RoleName) {
    await repo.createQueryBuilder().update().set({ name }).where('id = :id', { id }).execute();
    return repo.findOne({ where: { id } });
  }
}
