import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class ToolCryptoResponseDTO {
  @Expose()
  ciphertext!: string;

  @Exclude()
  static generate<T>(
    data: T
  ): T extends unknown[] ? ToolCryptoResponseDTO[] : ToolCryptoResponseDTO {
    return plainToInstance(ToolCryptoResponseDTO, data, {
      excludeExtraneousValues: true,
    }) as T extends unknown[] ? ToolCryptoResponseDTO[] : ToolCryptoResponseDTO;
  }
}
