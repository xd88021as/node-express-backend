import { AppDataSource } from '@database/data-source';
import { ShopTranslationEntity } from '@database/entities/shop-translation.entity';
import {
  CreateParams,
  FindManyParams,
  FindUniqueParams,
  UpdateParams,
} from '../interfaces/shop-translation-repository.interface';

const repo = AppDataSource.getRepository(ShopTranslationEntity);

export class ShopTranslationRepository {
  static createQueryBuilder() {
    return repo
      .createQueryBuilder('shop_translation')
      .leftJoinAndSelect('shop_translation.shop', 'shop')
      .select(['shop_translation', 'shop']);
  }

  static async create(params: CreateParams) {
    const entity = repo.create(params);
    const savedEntity = await repo.save(entity);
    return this.createQueryBuilder()
      .where('shop_translation.id = :id', { id: savedEntity.id })
      .getOne();
  }

  static async findUnique(params: FindUniqueParams) {
    const query = this.createQueryBuilder();
    query
      .where('shop.id = :shopId', { shopId: params.shopId })
      .andWhere('shop_translation.locale = :locale', { locale: params.locale });
    return query.getOne();
  }

  static async findMany(params: FindManyParams) {
    const query = this.createQueryBuilder();
    if (params.shopId) {
      query.andWhere('shop_translation.shop_id = :shopId', { shopId: params.shopId });
    }
    if (params.locale) {
      query.andWhere('shop_translation.locale = :locale', { locale: params.locale });
    }
    if (params.createdFrom) {
      query.andWhere('shop_translation.created_at >= :createdFrom', {
        createdFrom: params.createdFrom,
      });
    }
    if (params.createdTo) {
      query.andWhere('shop_translation.created_at <= :createdTo', { createdTo: params.createdTo });
    }
    const orderBy = params.orderBy ?? 'createdAt';
    const orderDirection = params.orderDirection ?? 'ASC';
    query.orderBy(`shop_translation.${orderBy}`, orderDirection);
    const [data, total] = await query.skip(params.skip).take(params.take).getManyAndCount();
    return { data, total };
  }

  static async update(id: number, params: UpdateParams) {
    await repo.createQueryBuilder().update().set(params).where('id = :id', { id }).execute();
    return this.createQueryBuilder().where('shop_translation.id = :id', { id }).getOne();
  }
}
