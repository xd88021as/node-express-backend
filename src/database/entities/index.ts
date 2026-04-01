import { CommodityTranslationEntity } from './commodity-translation.entity';
import { CommodityEntity } from './commodity.entity';
import { RoleEntity } from './role.entity';
import { ShopEntity } from './shop.entity';
import { ShopTranslationEntity } from './shop-translation.entity';
import { UserStatusEntity } from './user-status.entity';
import { UserEntity } from './user.entity';

export const entities = [
  RoleEntity,
  UserStatusEntity,
  UserEntity,
  ShopEntity,
  ShopTranslationEntity,
  CommodityEntity,
  CommodityTranslationEntity,
];
