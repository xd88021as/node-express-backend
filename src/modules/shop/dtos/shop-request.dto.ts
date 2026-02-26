import { OrderDirectionEnum } from '@utils/constants';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class ShopCreateDTO {
  @IsUUID()
  uuid!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  localPhoneNumber?: string;

  @IsOptional()
  @IsString()
  mobilePhoneNumber?: string;

  @IsOptional()
  @IsString()
  introduction?: string;
}

export class ShopFindUniqueDTO {
  @IsUUID()
  uuid!: string;
}

export class ShopFindManyDTO {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsString()
  userUuid?: string;

  @IsOptional()
  @IsString()
  userAccount?: string;

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

export class ShopUpdateDTO {
  @IsUUID()
  shopUuid!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  localPhoneNumber?: string;

  @IsOptional()
  @IsString()
  mobilePhoneNumber?: string;

  @IsOptional()
  @IsString()
  introduction?: string;
}
