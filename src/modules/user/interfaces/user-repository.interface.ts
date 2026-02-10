import { OrderDirection } from '@utils/constants';

export interface CreateParams {
  account: string;
  password: string;
  name: string;
  nickname?: string;
  introduction?: string;
  balance?: string;
  currency?: string;
  language?: string;
  status: { id: number };
  role: { id: number };
}

export interface FindUniqueParams {
  uuid?: string;
  account?: string;
}

export interface FindManyParams {
  currency?: string;
  statusName?: string;
  roleName?: string;
  createdFrom?: Date;
  createdTo?: Date;
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}

export interface UpdateParams {
  password?: string;
  name?: string;
  nickname?: string;
  introduction?: string;
  balance?: string;
  currency?: string;
  language?: string;
  status?: { id: number };
  role?: { id: number };
}
