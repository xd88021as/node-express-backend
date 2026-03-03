import { ShopService } from '@modules/shop/services/shop.service';
import { checkNotFound } from '@utils/http-error.util';
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

export class CommodityController {
  static async create(params: CommodityCreateDTO): Promise<CommodityResponseDTO> {
    const shop = await ShopService.findUnique({ uuid: params.shopUuid });
    checkNotFound(shop, 'Shop not found');
    const commodity = await CommodityService.create({
      shopId: shop.id,
      name: params.name,
      introduction: params.introduction,
      currency: params.currency,
      price: params.price,
    });
    return CommodityResponseDTO.generate(commodity);
  }

  static async findMany(params: CommodityFindManyDTO): Promise<CommodityPaginationResponseDTO> {
    const skip = params.page && params.limit ? (params.page - 1) * params.limit : undefined;
    const take = params.limit ?? undefined;
    const { commodities, total } = await CommodityService.findMany({ ...params, skip, take });
    return CommodityPaginationResponseDTO.generate({ commodities, total });
  }

  static async findUnique(params: CommodityFindUniqueDTO): Promise<CommodityResponseDTO> {
    const commodity = await CommodityService.findUnique({ uuid: params.commodityUuid });
    checkNotFound(commodity, 'Commodity not found');
    return CommodityResponseDTO.generate(commodity);
  }

  static async update(params: CommodityUpdateDTO): Promise<CommodityResponseDTO> {
    const commodity = await CommodityService.findUnique({ uuid: params.commodityUuid });
    checkNotFound(commodity, 'Commodity not found');
    const newCommodity = await CommodityService.update(commodity.id, {
      name: params.name,
      introduction: params.introduction,
      currency: params.currency,
      price: params.price,
    });
    return CommodityResponseDTO.generate(newCommodity);
  }
}
