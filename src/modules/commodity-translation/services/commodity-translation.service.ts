import { parseDateString } from '@utils/date-transform.util';
import {
  CommodityTranslationCreateParams,
  CommodityTranslationFindManyParams,
  CommodityTranslationFindUniqueParams,
  CommodityTranslationUpdateParams,
} from '../interfaces/commodity-translation-service.interface';
import { CommodityTranslationRepository } from '../repositories/commodity-translation.repository';

export class CommodityTranslationService {
  static async create(params: CommodityTranslationCreateParams) {
    const createParams = {
      locale: params.locale,
      name: params.name,
      introduction: params.introduction,
      commodity: { id: params.commodityId },
    };
    const translation = await CommodityTranslationRepository.create(createParams);
    return translation;
  }

  static async findUnique(params: CommodityTranslationFindUniqueParams) {
    const findParams = {
      commodityId: params.commodityId,
      locale: params.locale,
    };
    const translation = await CommodityTranslationRepository.findUnique(findParams);
    return translation || null;
  }

  static async findMany(params: CommodityTranslationFindManyParams) {
    const findParams = {
      commodityId: params.commodityId,
      commodityIds: params.commodityIds,
      locale: params.locale,
      createdFrom: parseDateString(params.createdFrom),
      createdTo: parseDateString(params.createdTo),
      skip: params.skip,
      take: params.take,
      orderBy: params.orderBy,
      orderDirection: params.orderDirection,
    };
    const { data, total } = await CommodityTranslationRepository.findMany(findParams);
    return { translations: data, total };
  }

  static async update(id: number, params: CommodityTranslationUpdateParams) {
    const updateParams = {
      locale: params.locale,
      name: params.name,
      introduction: params.introduction,
      ...(params.commodityId ? { commodity: { id: params.commodityId } } : {}),
    };
    const translation = await CommodityTranslationRepository.update(id, updateParams);
    return translation;
  }
}
