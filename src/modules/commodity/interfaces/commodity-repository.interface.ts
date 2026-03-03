import { OrderDirection } from '@utils/constants';

export interface CreateParams {
  name: string;
  introduction?: string;
  currency?: string;
  price?: string;
  shop: { id: number };
}

export interface FindUniqueParams {
  id?: number;
  uuid?: string;
}

export interface FindManyParams {
  shopId?: number;
  shopUuid?: string;
  shopName?: string;
  currency?: string;
  createdFrom?: Date;
  createdTo?: Date;
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}

export interface UpdateParams {
  name?: string;
  introduction?: string;
  currency?: string;
  price?: string;
  shop?: { id: number };
}
