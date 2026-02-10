import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';

export class UserResponseDTO {
  @Expose()
  uuid!: string;

  @Expose()
  account!: string;

  @Expose()
  name!: string;

  @Expose()
  nickname?: string;

  @Expose()
  introduction?: string;

  @Expose()
  balance!: string;

  @Expose()
  currency!: string;

  @Expose()
  language!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  @Transform(({ obj }) => obj.status?.name)
  statusName!: string;

  @Expose()
  @Transform(({ obj }) => obj.role?.name)
  roleName!: string;

  @Exclude()
  static generate<T>(data: T): T extends unknown[] ? UserResponseDTO[] : UserResponseDTO {
    return plainToInstance(UserResponseDTO, data, {
      excludeExtraneousValues: true,
    }) as unknown as T extends unknown[] ? UserResponseDTO[] : UserResponseDTO;
  }
}
