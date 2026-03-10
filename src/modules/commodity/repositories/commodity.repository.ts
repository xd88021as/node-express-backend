import { AppDataSource } from '@database/data-source';
import { CommodityEntity } from '@database/entities/commodity.entity';
import {
  CreateParams,
  FindManyParams,
  FindUniqueParams,
  UpdateParams,
} from '../interfaces/commodity-repository.interface';

const repo = AppDataSource.getRepository(CommodityEntity);

export class CommodityRepository {
  static createQueryBuilder() {
    return repo
      .createQueryBuilder('commodity')
      .leftJoinAndSelect('commodity.shop', 'shop')
      .leftJoinAndSelect('shop.user', 'user')
      .select(['commodity', 'shop', 'user']);
  }

  static async create(params: CreateParams) {
    const entity = repo.create(params);
    const savedEntity = await repo.save(entity);
    return this.createQueryBuilder().where('commodity.id = :id', { id: savedEntity.id }).getOne();
  }

  static async findUnique(params: FindUniqueParams) {
    const query = this.createQueryBuilder();
    if (params.id) {
      query.where('commodity.id = :id', { id: params.id });
    } else if (params.uuid) {
      query.where('commodity.uuid = :uuid', { uuid: params.uuid });
    }
    return query.getOne();
  }

  static async findMany(params: FindManyParams) {
    const query = this.createQueryBuilder();
    if (params.shopId) {
      query.andWhere('shop.id = :shopId', { shopId: params.shopId });
    }
    if (params.shopUuid) {
      query.andWhere('shop.uuid = :shopUuid', { shopUuid: params.shopUuid });
    }
    if (params.shopName) {
      query.andWhere('shop.name = :shopName', { shopName: params.shopName });
    }
    if (params.currency) {
      query.andWhere('commodity.currency = :currency', { currency: params.currency });
    }
    if (params.createdFrom) {
      query.andWhere('commodity.created_at >= :createdFrom', { createdFrom: params.createdFrom });
    }
    if (params.createdTo) {
      query.andWhere('commodity.created_at <= :createdTo', { createdTo: params.createdTo });
    }
    const orderBy = params.orderBy ?? 'id';
    const orderDirection = params.orderDirection ?? 'ASC';
    query.orderBy(`commodity.${orderBy}`, orderDirection);
    const [data, total] = await query.skip(params.skip).take(params.take).getManyAndCount();
    return { data, total };
  }

  static async update(id: number, params: UpdateParams) {
    await repo.createQueryBuilder().update().set(params).where('id = :id', { id }).execute();
    return this.createQueryBuilder().where('commodity.id = :id', { id }).getOne();
  }
}
