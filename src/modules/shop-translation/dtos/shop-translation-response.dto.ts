import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class ShopTranslationResponseDTO {
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
  ): T extends unknown[] ? ShopTranslationResponseDTO[] : ShopTranslationResponseDTO {
    return plainToInstance(ShopTranslationResponseDTO, data, {
      excludeExtraneousValues: true,
    }) as T extends unknown[] ? ShopTranslationResponseDTO[] : ShopTranslationResponseDTO;
  }
}

export class ShopTranslationPaginationResponseDTO {
  @Expose()
  translations!: ShopTranslationResponseDTO[];

  @Expose()
  total!: number;

  @Exclude()
  static generate(data: {
    translations: any[];
    total: number;
  }): ShopTranslationPaginationResponseDTO {
    return plainToInstance(ShopTranslationPaginationResponseDTO, {
      translations: ShopTranslationResponseDTO.generate(data.translations),
      total: data.total,
    });
  }
}
