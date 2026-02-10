import { OrderDirection } from '@utils/constants';

export interface UserCreateParams {
  account: string;
  password: string;
  name?: string;
  nickname?: string;
  introduction?: string;
  balance?: string;
  currency?: string;
  language?: string;
  statusId: number;
  roleId: number;
}

export interface UserFindUniqueParams {
  uuid?: string;
  account?: string;
}

export interface UserFindManyParams {
  currency?: string;
  statusName?: string;
  roleName?: string;
  createdFrom?: string;
  createdTo?: string;
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}

export interface UserUpdateParams {
  password?: string;
  name?: string;
  nickname?: string;
  introduction?: string;
  balance?: string;
  currency?: string;
  language?: string;
  statusId?: number;
  roleId?: number;
}
