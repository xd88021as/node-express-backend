import { IsString } from 'class-validator';

export class ToolCryptoDTO {
  @IsString()
  plaintext!: string;
}
