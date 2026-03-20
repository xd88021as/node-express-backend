import { UserService } from '@modules/user/services/user.service';
import { CommodityService } from '@modules/commodity/services/commodity.service';
import { checkForbidden, checkNotFound } from '@utils/http-error.util';
import {
  ShopCreateDTO,
  ShopFindManyDTO,
  ShopFindUniqueDTO,
  ShopUpdateDTO,
} from '../dtos/shop-request.dto';
import { ShopPaginationResponseDTO, ShopResponseDTO } from '../dtos/shop-response.dto';
import { ShopService } from '../services/shop.service';
import { TokenPayload } from '@utils/jwt.util';
import { ShopHtml } from '../shop.html';

export class ShopController {
  static async create(params: ShopCreateDTO): Promise<ShopResponseDTO> {
    const user = await UserService.findUnique({ uuid: params.userUuid });
    checkNotFound(user, 'User not found');
    const shop = await ShopService.create({
      userId: user.id,
      name: params.name,
      localPhoneNumber: params.localPhoneNumber,
      mobilePhoneNumber: params.mobilePhoneNumber,
      introduction: params.introduction,
    });
    return ShopResponseDTO.generate({ ...shop, userUuid: user.uuid, userName: user.name });
  }

  static async findMany(params: ShopFindManyDTO): Promise<ShopPaginationResponseDTO> {
    const skip = params.page && params.limit ? (params.page - 1) * params.limit : undefined;
    const take = params.limit ?? undefined;
    const { shops, total } = await ShopService.findMany({ ...params, skip, take });
    return ShopPaginationResponseDTO.generate({
      shops: shops.map((shop) => ({ ...shop, userUuid: shop.user.uuid, userName: shop.user.name })),
      total,
    });
  }

  static async findUnique(params: ShopFindUniqueDTO): Promise<ShopResponseDTO> {
    const shop = await ShopService.findUnique({ uuid: params.shopUuid });
    checkNotFound(shop, 'Shop not found');
    return ShopResponseDTO.generate({
      ...shop,
      userUuid: shop.user.uuid,
      userName: shop.user.name,
    });
  }

  static async update(params: ShopUpdateDTO, tokenPayload: TokenPayload): Promise<ShopResponseDTO> {
    const shop = await ShopService.findUnique({ uuid: params.shopUuid });
    checkNotFound(shop, 'Shop not found');
    const isAdmin = tokenPayload.roleName === 'admin';
    const isSelf = tokenPayload.userUuid === shop.user.uuid;
    checkForbidden(isAdmin || isSelf);
    const newShop = await ShopService.update(shop.id, {
      name: params.name,
      localPhoneNumber: params.localPhoneNumber,
      mobilePhoneNumber: params.mobilePhoneNumber,
      introduction: params.introduction,
    });
    return ShopResponseDTO.generate({
      ...newShop,
      userUuid: shop.user.uuid,
      userName: shop.user.name,
    });
  }

  static async generateMenuHtml(params: ShopFindUniqueDTO): Promise<string> {
    const shop = await ShopService.findUnique({ uuid: params.shopUuid });
    checkNotFound(shop, 'Shop not found');

    const { commodities } = await CommodityService.findMany({ shopUuid: shop.uuid });
    return ShopHtml.renderMenuHtml({
      shop: {
        name: shop.name,
        introduction: shop.introduction,
        localPhoneNumber: shop.localPhoneNumber,
        mobilePhoneNumber: shop.mobilePhoneNumber,
      },
      commodities,
    });
  }
}
