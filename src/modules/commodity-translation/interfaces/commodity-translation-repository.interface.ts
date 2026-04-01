import { OrderDirection } from '@utils/constants';

export interface CreateParams {
  locale: string;
  name: string;
  introduction?: string;
  commodity: { id: number };
}

export interface FindUniqueParams {
  commodityId: number;
  locale: string;
}

export interface FindManyParams {
  commodityId?: number;
  commodityIds?: number[];
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
  commodity?: { id: number };
}
