import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthSignInDTO {
  @IsNotEmpty()
  @IsString()
  account!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class AuthSignUpDTO {
  @IsNotEmpty()
  @IsString()
  account!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  language?: string;
}
