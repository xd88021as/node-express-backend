import { OrderDirectionEnum } from '@utils/constants';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class ShopTranslationCreateDTO {
  @IsUUID()
  shopUuid!: string;

  @IsString()
  locale!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  introduction?: string;
}

export class ShopTranslationFindManyDTO {
  @IsUUID()
  shopUuid!: string;

  @IsOptional()
  @IsString()
  locale?: string;

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

export class ShopTranslationUpdateDTO {
  @IsUUID()
  shopUuid!: string;

  @IsString()
  targetLocale!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  newLocale?: string;

  @IsOptional()
  @IsString()
  introduction?: string;
}
