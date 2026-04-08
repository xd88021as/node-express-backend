import { OrderDirectionEnum } from '@utils/constants';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CommodityCreateDTO {
  @IsUUID()
  shopUuid!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  introduction?: string;

  @IsString()
  currency!: string;

  @IsString()
  price!: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sortOrder?: number;
}

export class CommodityFindUniqueDTO {
  @IsUUID()
  commodityUuid!: string;
}

export class CommodityFindManyDTO {
  @IsOptional()
  @IsString()
  shopUuid?: string;

  @IsOptional()
  @IsString()
  shopName?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsDateString()
  @Type(() => String)
  createdFrom?: string;

  @IsOptional()
  @IsDateString()
  @Type(() => String)
  createdTo?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsEnum(OrderDirectionEnum, { message: "orderDirection must be 'ASC' or 'DESC'" })
  orderDirection?: OrderDirectionEnum;
}

export class CommodityUpdateDTO {
  @IsUUID()
  commodityUuid!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  introduction?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sortOrder?: number;
}
