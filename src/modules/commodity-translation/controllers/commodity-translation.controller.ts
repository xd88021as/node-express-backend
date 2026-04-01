import { CommodityService } from '@modules/commodity/services/commodity.service';
import { checkForbidden, checkNotFound } from '@utils/http-error.util';
import { TokenPayload } from '@utils/jwt.util';
import {
  CommodityTranslationCreateDTO,
  CommodityTranslationFindUniqueDTO,
  CommodityTranslationUpdateDTO,
} from '../dtos/commodity-translation-request.dto';
import { CommodityTranslationResponseDTO } from '../dtos/commodity-translation-response.dto';
import { CommodityTranslationService } from '../services/commodity-translation.service';

export class CommodityTranslationController {
  static async create(
    params: CommodityTranslationCreateDTO,
    tokenPayload: TokenPayload
  ): Promise<CommodityTranslationResponseDTO> {
    const commodity = await CommodityService.findUnique({ uuid: params.commodityUuid });
    checkNotFound(commodity, 'Commodity not found');
    const isAdmin = tokenPayload.roleName === 'admin';
    const isSelf = tokenPayload.userUuid === commodity.shop.user.uuid;
    checkForbidden(isAdmin || isSelf);
    const translation = await CommodityTranslationService.create({
      locale: params.locale,
      name: params.name,
      introduction: params.introduction,
      commodityId: commodity.id,
    });
    return CommodityTranslationResponseDTO.generate(translation);
  }

  static async findUnique(
    params: CommodityTranslationFindUniqueDTO
  ): Promise<CommodityTranslationResponseDTO> {
    const commodity = await CommodityService.findUnique({ uuid: params.commodityUuid });
    checkNotFound(commodity, 'Commodity not found');
    const translation = await CommodityTranslationService.findUnique({
      commodityId: commodity.id,
      locale: params.locale,
    });
    checkNotFound(translation, 'CommodityTranslation not found');
    return CommodityTranslationResponseDTO.generate(translation);
  }

  static async update(
    params: CommodityTranslationUpdateDTO,
    tokenPayload: TokenPayload
  ): Promise<CommodityTranslationResponseDTO> {
    const commodity = await CommodityService.findUnique({ uuid: params.commodityUuid });
    checkNotFound(commodity, 'Commodity not found');
    const translation = await CommodityTranslationService.findUnique({
      commodityId: commodity.id,
      locale: params.targetLocale,
    });
    checkNotFound(translation, 'CommodityTranslation not found');
    const isAdmin = tokenPayload.roleName === 'admin';
    const isSelf = tokenPayload.userUuid === commodity.shop.user.uuid;
    checkForbidden(isAdmin || isSelf);
    const newTranslation = await CommodityTranslationService.update(translation.id, {
      locale: params.newLocale,
      name: params.name,
      introduction: params.introduction,
    });
    return CommodityTranslationResponseDTO.generate(newTranslation);
  }
}
