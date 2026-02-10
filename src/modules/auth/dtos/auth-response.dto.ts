import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class AuthResponseDTO {
  @Expose()
  userUuid!: string;

  @Expose()
  balance!: string;

  @Expose()
  currency!: string;

  @Expose()
  language!: string;

  @Expose()
  token!: string;

  @Exclude()
  static generate<T>(data: T): T extends unknown[] ? AuthResponseDTO[] : AuthResponseDTO {
    return plainToInstance(AuthResponseDTO, data, {
      excludeExtraneousValues: true,
    }) as T extends unknown[] ? AuthResponseDTO[] : AuthResponseDTO;
  }
}
