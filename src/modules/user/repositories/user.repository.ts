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
  static createQueryBuilder() {
    return repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.status', 'status')
      .leftJoinAndSelect('user.role', 'role')
      .select(['user', 'status.name', 'role.name']);
  }

  static async create(params: CreateParams) {
    const entity = repo.create(params);
    const savedEntity = await repo.save(entity);
    return this.createQueryBuilder().where('user.id = :id', { id: savedEntity.id }).getOne();
  }

  static async findUnique(params: FindUniqueParams) {
    const query = this.createQueryBuilder();
    if (params.id) {
      query.where('user.id = :id', { id: params.id });
    } else if (params.uuid) {
      query.where('user.uuid = :uuid', { uuid: params.uuid });
    } else if (params.account) {
      query.where('user.account = :account', { account: params.account });
    }
    return query.getOne();
  }

  static async findMany(params: FindManyParams) {
    const query = this.createQueryBuilder();
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
    const [data, total] = await query.skip(params.skip).take(params.take).getManyAndCount();
    return { data, total };
  }

  static async update(id: number, params: UpdateParams) {
    await repo.createQueryBuilder().update().set(params).where('id = :id', { id }).execute();
    return this.createQueryBuilder().where('user.id = :id', { id }).getOne();
  }
}
