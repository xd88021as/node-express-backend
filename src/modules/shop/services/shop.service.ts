import { parseDateString } from '@utils/date-transform.util';
import {
  ShopCreateParams,
  ShopFindManyParams,
  ShopFindUniqueParams,
  ShopUpdateParams,
} from '../interfaces/shop-service.interface';
import { ShopRepository } from '../repositories/shop.repository';

export class ShopService {
  static async create(params: ShopCreateParams) {
    const createParams = {
      name: params.name,
      localPhoneNumber: params.localPhoneNumber,
      mobilePhoneNumber: params.mobilePhoneNumber,
      introduction: params.introduction,
      user: { id: params.userId },
    };
    const shop = await ShopRepository.create(createParams);
    return shop;
  }

  static async findUnique(params: ShopFindUniqueParams) {
    const shop = await ShopRepository.findUnique(params);
    return shop;
  }

  static async findMany(params: ShopFindManyParams) {
    const findParams = {
      userId: params.userId,
      userUuid: params.userUuid,
      userAccount: params.userAccount,
      createdFrom: parseDateString(params.createdFrom),
      createdTo: parseDateString(params.createdTo),
      skip: params.skip,
      take: params.take,
      orderBy: params.orderBy,
      orderDirection: params.orderDirection,
    };
    const { data, total } = await ShopRepository.findMany(findParams);
    return { shops: data, total };
  }

  static async update(id: number, params: ShopUpdateParams) {
    const updateParams = {
      name: params.name,
      localPhoneNumber: params.localPhoneNumber,
      mobilePhoneNumber: params.mobilePhoneNumber,
      introduction: params.introduction,
      ...(params.userId ? { user: { id: params.userId } } : {}),
    };
    const shop = await ShopRepository.update(id, updateParams);
    return shop;
  }
}
