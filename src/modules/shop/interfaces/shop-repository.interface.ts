import { OrderDirection } from '@utils/constants';

export interface CreateParams {
  name: string;
  localPhoneNumber?: string;
  mobilePhoneNumber?: string;
  introduction?: string;
  user: { id: number };
}

export interface FindUniqueParams {
  id?: number;
  uuid?: string;
  name?: string;
}

export interface FindManyParams {
  userId?: number;
  userUuid?: string;
  userAccount?: string;
  createdFrom?: Date;
  createdTo?: Date;
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
}

export interface UpdateParams {
  name?: string;
  localPhoneNumber?: string;
  mobilePhoneNumber?: string;
  introduction?: string;
  user?: { id: number };
}
