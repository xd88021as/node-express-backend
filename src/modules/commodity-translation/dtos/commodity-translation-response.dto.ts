import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class CommodityTranslationResponseDTO {
  @Expose()
  locale!: string;

  @Expose()
  name!: string;

  @Expose()
  introduction?: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  @Exclude()
  static generate<T>(
    data: T
  ): T extends unknown[] ? CommodityTranslationResponseDTO[] : CommodityTranslationResponseDTO {
    return plainToInstance(CommodityTranslationResponseDTO, data, {
      excludeExtraneousValues: true,
    }) as T extends unknown[] ? CommodityTranslationResponseDTO[] : CommodityTranslationResponseDTO;
  }
}
