import { parseDateString } from '@utils/date-transform.util';
import {
  CommodityCreateParams,
  CommodityFindManyParams,
  CommodityFindUniqueParams,
  CommodityUpdateParams,
} from '../interfaces/commodity-service.interface';
import { CommodityRepository } from '../repositories/commodity.repository';

export class CommodityService {
  static async create(params: CommodityCreateParams) {
    const createParams = {
      name: params.name,
      introduction: params.introduction,
      currency: params.currency,
      price: params.price,
      sortOrder: params.sortOrder,
      shop: { id: params.shopId },
    };
    const commodity = await CommodityRepository.create(createParams);
    return commodity;
  }

  static async findUnique(params: CommodityFindUniqueParams) {
    const commodity = await CommodityRepository.findUnique(params);
    return commodity;
  }

  static async findMany(params: CommodityFindManyParams) {
    const fingParams = {
      shopId: params.shopId,
      shopUuid: params.shopUuid,
      shopName: params.shopName,
      locale: params.locale,
      currency: params.currency,
      createdFrom: parseDateString(params.createdFrom),
      createdTo: parseDateString(params.createdTo),
      skip: params.skip,
      take: params.take,
      orderBy: params.orderBy,
      orderDirection: params.orderDirection,
    };
    const { data, total } = await CommodityRepository.findMany(fingParams);
    return { commodities: data, total };
  }

  static async update(id: number, params: CommodityUpdateParams) {
    const updateParams = {
      name: params.name,
      introduction: params.introduction,
      currency: params.currency,
      price: params.price,
      sortOrder: params.sortOrder,
      ...(params.shopId ? { shop: { id: params.shopId } } : {}),
    };
    const commodity = await CommodityRepository.update(id, updateParams);
    return commodity;
  }
}
