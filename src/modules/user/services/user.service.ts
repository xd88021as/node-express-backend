import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../repositories/user.repository';
import {
  UserCreateParams,
  UserFindManyParams,
  UserFindUniqueParams,
  UserUpdateParams,
} from '../interfaces/user-service.interface';
import { hashPassword } from '@utils/crypto.util';
import { parseDateString } from '@utils/date-transform.util';

export class UserService {
  static async create(params: UserCreateParams) {
    const createParams = {
      account: params.account,
      password: hashPassword(params.password),
      name: params.name ? params.name : uuidv4(),
      nickname: params.nickname,
      introduction: params.introduction,
      balance: params.balance,
      currency: params.currency,
      language: params.language,
      status: { id: params.statusId },
      role: { id: params.roleId },
    };
    const result = await UserRepository.create(createParams);
    return result;
  }

  static async findUnique(params: UserFindUniqueParams) {
    const query = await UserRepository.findUnique(params);
    return query;
  }

  static async findMany(params: UserFindManyParams) {
    const searchParams = {
      currency: params.currency,
      statusName: params.statusName,
      roleName: params.roleName,
      createdFrom: parseDateString(params.createdFrom),
      createdTo: parseDateString(params.createdTo),
      skip: params.skip,
      take: params.take,
      orderBy: params.orderBy,
      orderDirection: params.orderDirection,
    };
    const users = await UserRepository.findMany(searchParams);
    return users;
  }

  static async update(id: number, params: UserUpdateParams) {
    const updateParams = {
      password: params.password ? hashPassword(params.password) : undefined,
      name: params.name,
      nickname: params.nickname,
      introduction: params.introduction,
      balance: params.balance,
      currency: params.currency,
      language: params.language,
      ...(params.statusId ? { status: { id: params.statusId } } : {}),
      ...(params.roleId ? { role: { id: params.roleId } } : {}),
    };
    const result = await UserRepository.update(id, updateParams);
    return result;
  }
}
