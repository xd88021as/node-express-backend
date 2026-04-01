import { OrderDirection } from '@utils/constants';

export interface CommodityTranslationCreateParams {
  locale: string;
  name: string;
  introduction?: string;
  commodityId: number;
}

export interface CommodityTranslationFindUniqueParams {
  commodityId: number;
  locale: string;
}

export interface CommodityTranslationFindManyParams {
  commodityId?: number;
  commodityIds?: number[];
  locale?: string;
  createdFrom?: string;
  createdTo?: string;
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}

export interface CommodityTranslationUpdateParams {
  locale?: string;
  name?: string;
  introduction?: string;
  commodityId?: number;
}
