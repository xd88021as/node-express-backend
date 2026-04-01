import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CommodityTranslationCreateDTO {
  @IsUUID()
  commodityUuid!: string;

  @IsString()
  locale!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  introduction?: string;
}

export class CommodityTranslationFindUniqueDTO {
  @IsUUID()
  commodityUuid!: string;

  @IsString()
  locale!: string;
}

export class CommodityTranslationUpdateDTO {
  @IsUUID()
  commodityUuid!: string;

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
