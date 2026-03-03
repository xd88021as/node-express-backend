import { UserService } from '@modules/user/services/user.service';
import { checkNotFound } from '@utils/http-error.util';
import {
  ShopCreateDTO,
  ShopFindManyDTO,
  ShopFindUniqueDTO,
  ShopUpdateDTO,
} from '../dtos/shop-request.dto';
import { ShopPaginationResponseDTO, ShopResponseDTO } from '../dtos/shop-response.dto';
import { ShopService } from '../services/shop.service';

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
    return ShopResponseDTO.generate(shop);
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
    return ShopResponseDTO.generate(shop);
  }

  static async update(params: ShopUpdateDTO): Promise<ShopResponseDTO> {
    const shop = await ShopService.findUnique({ uuid: params.shopUuid });
    checkNotFound(shop, 'Shop not found');
    const newShop = await ShopService.update(shop.id, {
      name: params.name,
      localPhoneNumber: params.localPhoneNumber,
      mobilePhoneNumber: params.mobilePhoneNumber,
      introduction: params.introduction,
    });
    return ShopResponseDTO.generate(newShop);
  }
}
