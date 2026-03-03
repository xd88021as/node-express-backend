import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class ShopResponseDTO {
  @Expose()
  uuid!: string;

  @Expose()
  name!: string;

  @Expose()
  localPhoneNumber?: string;

  @Expose()
  mobilePhoneNumber?: string;

  @Expose()
  introduction?: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  @Expose()
  userUuid!: string;

  @Expose()
  userName!: string;

  @Exclude()
  static generate<T>(data: T): T extends unknown[] ? ShopResponseDTO[] : ShopResponseDTO {
    return plainToInstance(ShopResponseDTO, data, {
      excludeExtraneousValues: true,
    }) as T extends unknown[] ? ShopResponseDTO[] : ShopResponseDTO;
  }
}

export class ShopPaginationResponseDTO {
  @Expose()
  shops!: ShopResponseDTO[];

  @Expose()
  total!: number;

  @Exclude()
  static generate(data: { shops: any[]; total: number }): ShopPaginationResponseDTO {
    return plainToInstance(ShopPaginationResponseDTO, {
      shops: ShopResponseDTO.generate(data.shops),
      total: data.total,
    });
  }
}
