import { checkForbidden, checkNotFound } from '@utils/http-error.util';
import {
  ShopTranslationCreateDTO,
  ShopTranslationFindManyDTO,
  ShopTranslationUpdateDTO,
} from '../dtos/shop-translation-request.dto';
import {
  ShopTranslationPaginationResponseDTO,
  ShopTranslationResponseDTO,
} from '../dtos/shop-translation-response.dto';
import { ShopTranslationService } from '../services/shop-translation.service';
import { ShopService } from '@modules/shop/services/shop.service';
import { TokenPayload } from '@utils/jwt.util';

export class ShopTranslationController {
  static async create(
    params: ShopTranslationCreateDTO,
    tokenPayload: TokenPayload
  ): Promise<ShopTranslationResponseDTO> {
    const shop = await ShopService.findUnique({ uuid: params.shopUuid });
    checkNotFound(shop, 'Shop not found');
    const isAdmin = tokenPayload.roleName === 'admin';
    const isSelf = tokenPayload.userUuid === shop.user.uuid;
    checkForbidden(isAdmin || isSelf);
    const translation = await ShopTranslationService.create({
      locale: params.locale,
      name: params.name,
      introduction: params.introduction,
      shopId: shop.id,
    });
    return ShopTranslationResponseDTO.generate(translation);
  }

  static async findMany(
    params: ShopTranslationFindManyDTO
  ): Promise<ShopTranslationPaginationResponseDTO> {
    const shop = await ShopService.findUnique({ uuid: params.shopUuid });
    checkNotFound(shop, 'Shop not found');
    const skip = params.page && params.limit ? (params.page - 1) * params.limit : undefined;
    const take = params.limit ?? undefined;
    const { translations, total } = await ShopTranslationService.findMany({
      ...params,
      shopId: shop.id,
      skip,
      take,
    });
    return ShopTranslationPaginationResponseDTO.generate({
      translations: translations.map((translation) => ({ ...translation })),
      total,
    });
  }

  static async update(
    params: ShopTranslationUpdateDTO,
    tokenPayload: TokenPayload
  ): Promise<ShopTranslationResponseDTO> {
    const shop = await ShopService.findUnique({ uuid: params.shopUuid });
    checkNotFound(shop, 'Shop not found');
    const translation = await ShopTranslationService.findUnique({
      shopId: shop.id,
      locale: params.targetLocale,
    });
    checkNotFound(translation, 'ShopTranslation not found');
    const isAdmin = tokenPayload.roleName === 'admin';
    const isSelf = tokenPayload.userUuid === shop.user.uuid;
    checkForbidden(isAdmin || isSelf);
    const newTranslation = await ShopTranslationService.update(translation.id, {
      locale: params.newLocale,
      name: params.name,
      introduction: params.introduction,
    });
    return ShopTranslationResponseDTO.generate(newTranslation);
  }
}
