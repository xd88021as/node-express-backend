import { parseDateString } from '@utils/date-transform.util';
import {
  ShopTranslationCreateParams,
  ShopTranslationFindManyParams,
  ShopTranslationFindUniqueParams,
  ShopTranslationUpdateParams,
} from '../interfaces/shop-translation-service.interface';
import { ShopTranslationRepository } from '../repositories/shop-translation.repository';

export class ShopTranslationService {
  static async create(params: ShopTranslationCreateParams) {
    const createParams = {
      locale: params.locale,
      name: params.name,
      introduction: params.introduction,
      shop: { id: params.shopId },
    };
    const translation = await ShopTranslationRepository.create(createParams);
    return translation;
  }

  static async findUnique(params: ShopTranslationFindUniqueParams) {
    const findParams = {
      shopId: params.shopId,
      locale: params.locale,
    };
    const translation = await ShopTranslationRepository.findUnique(findParams);
    return translation || null;
  }

  static async findMany(params: ShopTranslationFindManyParams) {
    const findParams = {
      shopId: params.shopId,
      locale: params.locale,
      createdFrom: parseDateString(params.createdFrom),
      createdTo: parseDateString(params.createdTo),
      skip: params.skip,
      take: params.take,
      orderBy: params.orderBy,
      orderDirection: params.orderDirection,
    };
    const { data, total } = await ShopTranslationRepository.findMany(findParams);
    return { translations: data, total };
  }

  static async update(id: number, params: ShopTranslationUpdateParams) {
    const updateParams = {
      locale: params.locale,
      name: params.name,
      introduction: params.introduction,
      ...(params.shopId ? { shop: { id: params.shopId } } : {}),
    };
    const translation = await ShopTranslationRepository.update(id, updateParams);
    return translation;
  }
}
