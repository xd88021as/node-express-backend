import { OrderDirectionEnum } from '@utils/constants';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UserCreateDTO {
  @IsString()
  account!: string;

  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  introduction?: string;

  @IsOptional()
  @IsString()
  balance?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  statusName: string = 'active';

  @IsOptional()
  @IsString()
  roleName: string = 'user';
}

export class UserFindUniqueDTO {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsOptional()
  @IsString()
  account?: string;
}

export class UserFindManyDTO {
  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  statusName?: string;

  @IsOptional()
  @IsString()
  roleName?: string;

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

export class UserUpdateDTO {
  @IsUUID()
  uuid!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  introduction?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  statusName?: string;

  @IsOptional()
  @IsString()
  roleName?: string;
}

export class UserChangePasswordDTO {
  @IsString()
  uuid!: string;

  @IsString()
  @MinLength(1)
  oldPassword!: string;

  @IsString()
  @MinLength(1)
  newPassword!: string;
}
