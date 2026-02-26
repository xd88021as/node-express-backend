import { ShopEntity } from '@database/entities/shop.entity';
import { AppDataSource } from '@database/data-source';
import {
  CreateParams,
  FindManyParams,
  FindUniqueParams,
  UpdateParams,
} from '../interfaces/shop-repository.interface';

const repo = AppDataSource.getRepository(ShopEntity);

export class ShopRepository {
  static createQueryBuilder() {
    return repo
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.user', 'user')
      .select(['shop', 'user.uuid', 'user.name']);
  }

  static async create(params: CreateParams) {
    const entity = repo.create(params);
    const savedEntity = await repo.save(entity);
    return this.createQueryBuilder().where('shop.id = :id', { id: savedEntity.id }).getOne();
  }

  static async findUnique(params: FindUniqueParams) {
    const query = this.createQueryBuilder();
    if (params.id) {
      query.where('shop.id = :id', { id: params.id });
    } else if (params.uuid) {
      query.where('shop.uuid = :uuid', { uuid: params.uuid });
    } else if (params.name) {
      query.where('shop.name = :name', { name: params.name });
    }
    return query.getOne();
  }

  static async findMany(params: FindManyParams) {
    const query = this.createQueryBuilder();
    if (params.userId) {
      query.andWhere('user.id = :userId', { userId: params.userId });
    }
    if (params.userUuid) {
      query.andWhere('user.uuid = :userUuid', { userUuid: params.userUuid });
    }
    if (params.userAccount) {
      query.andWhere('user.account = :userAccount', { userAccount: params.userAccount });
    }
    if (params.createdFrom) {
      query.andWhere('user.created_at >= :createdFrom', { createdFrom: params.createdFrom });
    }
    if (params.createdTo) {
      query.andWhere('user.created_at <= :createdTo', { createdTo: params.createdTo });
    }
    const orderBy = params.orderBy ?? 'id';
    const orderDirection = params.orderDirection ?? 'ASC';
    query.orderBy(`shop.${orderBy}`, orderDirection);
    const [data, total] = await query.skip(params.skip).take(params.take).getManyAndCount();
    return { data, total };
  }

  static async update(id: number, params: UpdateParams) {
    await repo.createQueryBuilder().update().set(params).where('id = :id', { id }).execute();
    return this.createQueryBuilder().where('shop.id = :id', { id }).getOne();
  }
}
