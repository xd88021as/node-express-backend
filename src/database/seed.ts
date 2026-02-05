import { AppDataSource } from './data-source';
import { UserStatusEntity } from './entities/user-status.entity';
import { RoleEntity, RoleName } from './entities/role.entity';

export async function seedUserStatus() {
  const repository = AppDataSource.getRepository(UserStatusEntity);
  const defaulData = ['active', 'banned'];
  await Promise.all(
    defaulData.map(async (data) => {
      const existing = await repository.findOne({ where: { name: data } });
      if (!existing) {
        const newStatus = repository.create({ name: data });
        await repository.save(newStatus);
      }
    })
  );
}

export async function seedRole() {
  const repository = AppDataSource.getRepository(RoleEntity);
  const defaulData = ['admin', 'user', 'tester'];
  await Promise.all(
    defaulData.map(async (data) => {
      const existing = await repository.findOne({ where: { name: data as RoleName } });
      if (!existing) {
        const newStatus = repository.create({ name: data as RoleName });
        await repository.save(newStatus);
      }
    })
  );
}
