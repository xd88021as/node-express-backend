import { IsString } from 'class-validator';

export class RoleCreateDTO {
  @IsString()
  name!: string;
}

export class RoleUpdateDTO {
  @IsString()
  targetName!: string;

  @IsString()
  newName!: string;
}
