import { OrderDirection } from '@utils/constants';

export interface ShopTranslationCreateParams {
  locale: string;
  name: string;
  introduction?: string;
  shopId: number;
}

export interface ShopTranslationFindUniqueParams {
  shopId: number;
  locale: string;
}

export interface ShopTranslationFindManyParams {
  shopId: number;
  locale?: string;
  createdFrom?: string;
  createdTo?: string;
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}

export interface ShopTranslationUpdateParams {
  locale?: string;
  name?: string;
  introduction?: string;
  shopId?: number;
}
