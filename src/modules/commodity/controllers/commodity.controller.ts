import { ShopService } from '@modules/shop/services/shop.service';
import { checkForbidden, checkNotFound } from '@utils/http-error.util';
import {
  CommodityCreateDTO,
  CommodityFindManyDTO,
  CommodityFindUniqueDTO,
  CommodityUpdateDTO,
} from '../dtos/commodity-request.dto';
import {
  CommodityPaginationResponseDTO,
  CommodityResponseDTO,
} from '../dtos/commodity-response.dto';
import { CommodityService } from '../services/commodity.service';
import { TokenPayload } from '@utils/jwt.util';

export class CommodityController {
  static async create(
    params: CommodityCreateDTO,
    tokenPayload: TokenPayload
  ): Promise<CommodityResponseDTO> {
    const shop = await ShopService.findUnique({ uuid: params.shopUuid });
    checkNotFound(shop, 'Shop not found');
    const isAdmin = tokenPayload.roleName === 'admin';
    const isSelf = tokenPayload.userUuid === shop.user.uuid;
    checkForbidden(isAdmin || isSelf);
    const commodity = await CommodityService.create({
      shopId: shop.id,
      name: params.name,
      introduction: params.introduction,
      currency: params.currency,
      price: params.price,
      sortOrder: params.sortOrder,
    });
    return CommodityResponseDTO.generate({
      ...commodity,
      shopUuid: shop.uuid,
      shopName: shop.name,
    });
  }

  static async findMany(params: CommodityFindManyDTO): Promise<CommodityPaginationResponseDTO> {
    const skip = params.page && params.limit ? (params.page - 1) * params.limit : undefined;
    const take = params.limit ?? undefined;
    const { commodities, total } = await CommodityService.findMany({ ...params, skip, take });
    return CommodityPaginationResponseDTO.generate({
      commodities: commodities.map((commodity) => ({
        ...commodity,
        shopUuid: commodity.shop.uuid,
        shopName: commodity.shop.name,
      })),
      total,
    });
  }

  static async findUnique(params: CommodityFindUniqueDTO): Promise<CommodityResponseDTO> {
    const commodity = await CommodityService.findUnique({ uuid: params.commodityUuid });
    checkNotFound(commodity, 'Commodity not found');
    return CommodityResponseDTO.generate({
      ...commodity,
      shopUuid: commodity.shop.uuid,
      shopName: commodity.shop.name,
    });
  }

  static async update(
    params: CommodityUpdateDTO,
    tokenPayload: TokenPayload
  ): Promise<CommodityResponseDTO> {
    const commodity = await CommodityService.findUnique({ uuid: params.commodityUuid });
    checkNotFound(commodity, 'Commodity not found');
    const isAdmin = tokenPayload.roleName === 'admin';
    const isSelf = tokenPayload.userUuid === commodity.shop.user.uuid;
    checkForbidden(isAdmin || isSelf);
    const newCommodity = await CommodityService.update(commodity.id, {
      name: params.name,
      introduction: params.introduction,
      currency: params.currency,
      price: params.price,
      sortOrder: params.sortOrder,
    });
    return CommodityResponseDTO.generate({
      ...newCommodity,
      shopUuid: commodity.shop.uuid,
      shopName: commodity.shop.name,
    });
  }
}
