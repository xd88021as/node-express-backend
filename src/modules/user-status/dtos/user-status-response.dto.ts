import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class UserStatusResponseDTO {
  @Expose()
  name!: string;

  @Exclude()
  static generate<T>(
    data: T
  ): T extends unknown[] ? UserStatusResponseDTO[] : UserStatusResponseDTO {
    return plainToInstance(UserStatusResponseDTO, data, {
      excludeExtraneousValues: true,
    }) as T extends unknown[] ? UserStatusResponseDTO[] : UserStatusResponseDTO;
  }
}
