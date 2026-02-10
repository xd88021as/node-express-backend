import { UserEntity } from '@database/entities/user.entity';
import { AppDataSource } from '@database/data-source';
import {
  CreateParams,
  FindManyParams,
  FindUniqueParams,
  UpdateParams,
} from '../interfaces/user-repository.interface';

const repo = AppDataSource.getRepository(UserEntity);

export class UserRepository {
  static createQueryBuilderWithStatus() {
    return repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.status', 'status')
      .leftJoinAndSelect('user.role', 'role')
      .select(['user', 'status.name', 'role.name']);
  }

  static async create(params: CreateParams) {
    const entity = repo.create(params);
    const savedEntity = await repo.save(entity);
    return this.createQueryBuilderWithStatus()
      .where('user.uuid = :uuid', { uuid: savedEntity.uuid })
      .getOne();
  }

  static async findUnique(params: FindUniqueParams) {
    const query = this.createQueryBuilderWithStatus();
    if (params.uuid) {
      query.where('user.uuid = :uuid', { uuid: params.uuid });
    } else if (params.account) {
      query.where('user.account = :account', { account: params.account });
    }
    return query.getOne();
  }

  static async findMany(params: FindManyParams) {
    const query = this.createQueryBuilderWithStatus();
    if (params.currency) {
      query.andWhere('user.currency = :currency', { currency: params.currency });
    }
    if (params.statusName) {
      query.andWhere('status.name = :statusName', { statusName: params.statusName });
    }
    if (params.roleName) {
      query.andWhere('role.name = :roleName', { roleName: params.roleName });
    }
    if (params.createdFrom) {
      query.andWhere('user.created_at >= :createdFrom', { createdFrom: params.createdFrom });
    }
    if (params.createdTo) {
      query.andWhere('user.created_at <= :createdTo', { createdTo: params.createdTo });
    }
    const orderBy = params.orderBy ?? 'id';
    const orderDirection = params.orderDirection ?? 'ASC';
    query.orderBy(`user.${orderBy}`, orderDirection);
    return query.skip(params.skip).take(params.take).getMany();
  }

  static async update(id: number, params: UpdateParams) {
    await repo.createQueryBuilder().update().set(params).where('id = :id', { id }).execute();
    return this.createQueryBuilderWithStatus().where('user.id = :id', { id }).getOne();
  }
}
