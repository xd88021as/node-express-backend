import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class CommodityResponseDTO {
  @Expose()
  uuid!: string;

  @Expose()
  name!: string;

  @Expose()
  introduction?: string;

  @Expose()
  currency!: string;

  @Expose()
  price!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  @Expose()
  shopUuid!: string;

  @Expose()
  shopName!: string;

  @Exclude()
  static generate<T>(data: T): T extends unknown[] ? CommodityResponseDTO[] : CommodityResponseDTO {
    return plainToInstance(CommodityResponseDTO, data, {
      excludeExtraneousValues: true,
    }) as T extends unknown[] ? CommodityResponseDTO[] : CommodityResponseDTO;
  }
}

export class CommodityPaginationResponseDTO {
  @Expose()
  commodities!: CommodityResponseDTO[];

  @Expose()
  total!: number;

  @Exclude()
  static generate(data: { commodities: any[]; total: number }): CommodityPaginationResponseDTO {
    return plainToInstance(CommodityPaginationResponseDTO, {
      commodities: CommodityResponseDTO.generate(data.commodities),
      total: data.total,
    });
  }
}
