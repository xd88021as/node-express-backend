import { OrderDirection } from '@utils/constants';

export interface CreateParams {
  locale: string;
  name: string;
  introduction?: string;
  shop: { id: number };
}

export interface FindUniqueParams {
  shopId: number;
  locale: string;
}

export interface FindManyParams {
  shopId: number;
  locale?: string;
  createdFrom?: Date;
  createdTo?: Date;
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}

export interface UpdateParams {
  locale?: string;
  name?: string;
  introduction?: string;
  shop?: { id: number };
}
