import { AppDataSource } from '@database/data-source';
import { CommodityTranslationEntity } from '@database/entities/commodity-translation.entity';
import {
  CreateParams,
  FindManyParams,
  FindUniqueParams,
  UpdateParams,
} from '../interfaces/commodity-translation-repository.interface';

const repo = AppDataSource.getRepository(CommodityTranslationEntity);

export class CommodityTranslationRepository {
  static createQueryBuilder() {
    return repo
      .createQueryBuilder('commodity_translation')
      .leftJoinAndSelect('commodity_translation.commodity', 'commodity')
      .select(['commodity_translation', 'commodity']);
  }

  static async create(params: CreateParams) {
    const entity = repo.create(params);
    const savedEntity = await repo.save(entity);
    return this.createQueryBuilder()
      .where('commodity_translation.id = :id', { id: savedEntity.id })
      .getOne();
  }

  static async findUnique(params: FindUniqueParams) {
    const query = this.createQueryBuilder();
    query
      .where('commodity.id = :commodityId', { commodityId: params.commodityId })
      .andWhere('commodity_translation.locale = :locale', { locale: params.locale });
    return query.getOne();
  }

  static async findMany(params: FindManyParams) {
    const query = this.createQueryBuilder();
    if (params.commodityId) {
      query.andWhere('commodity_translation.commodity_id = :commodityId', {
        commodityId: params.commodityId,
      });
    }
    if (params.commodityIds?.length) {
      query.andWhere('commodity.id IN (:...commodityIds)', {
        commodityIds: params.commodityIds,
      });
    }
    if (params.locale) {
      query.andWhere('commodity_translation.locale = :locale', { locale: params.locale });
    }
    if (params.createdFrom) {
      query.andWhere('commodity_translation.created_at >= :createdFrom', {
        createdFrom: params.createdFrom,
      });
    }
    if (params.createdTo) {
      query.andWhere('commodity_translation.created_at <= :createdTo', {
        createdTo: params.createdTo,
      });
    }
    const orderBy = params.orderBy ?? 'createdAt';
    const orderDirection = params.orderDirection ?? 'ASC';
    query.orderBy(`commodity_translation.${orderBy}`, orderDirection);
    const [data, total] = await query.skip(params.skip).take(params.take).getManyAndCount();
    return { data, total };
  }

  static async update(id: number, params: UpdateParams) {
    await repo.createQueryBuilder().update().set(params).where('id = :id', { id }).execute();
    return this.createQueryBuilder().where('commodity_translation.id = :id', { id }).getOne();
  }
}
