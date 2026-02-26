import { OrderDirection } from '@utils/constants';

export interface ShopCreateParams {
  name: string;
  localPhoneNumber?: string;
  mobilePhoneNumber?: string;
  introduction?: string;
  userId: number;
}

export interface ShopFindUniqueParams {
  id?: number;
  uuid?: string;
  name?: string;
}

export interface ShopFindManyParams {
  userId?: number;
  userUuid?: string;
  userAccount?: string;
  createdFrom?: string;
  createdTo?: string;
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}

export interface ShopUpdateParams {
  name?: string;
  localPhoneNumber?: string;
  mobilePhoneNumber?: string;
  introduction?: string;
  userId?: number;
}
