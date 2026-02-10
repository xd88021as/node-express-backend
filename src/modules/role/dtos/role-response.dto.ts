import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class RoleResponseDTO {
  @Expose()
  name!: string;

  @Exclude()
  static generate<T>(data: T): T extends unknown[] ? RoleResponseDTO[] : RoleResponseDTO {
    return plainToInstance(RoleResponseDTO, data, {
      excludeExtraneousValues: true,
    }) as T extends unknown[] ? RoleResponseDTO[] : RoleResponseDTO;
  }
}
