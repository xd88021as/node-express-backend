import { OrderDirection } from '@utils/constants';

export interface CommodityCreateParams {
  name: string;
  introduction?: string;
  currency?: string;
  price?: string;
  sortOrder?: number;
  shopId: number;
}

export interface CommodityFindUniqueParams {
  id?: number;
  uuid?: string;
  locale?: string;
}

export interface CommodityFindManyParams {
  shopId?: number;
  shopUuid?: string;
  shopName?: string;
  locale?: string;
  currency?: string;
  createdFrom?: string;
  createdTo?: string;
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}

export interface CommodityUpdateParams {
  name?: string;
  introduction?: string;
  currency?: string;
  price?: string;
  sortOrder?: number;
  shopId?: number;
}
