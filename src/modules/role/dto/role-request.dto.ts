import { RoleName } from '@database/entities/role.entity';
import { IsString } from 'class-validator';

export class RoleCreateDTO {
  @IsString()
  name!: RoleName;
}

export class RoleUpdateDTO {
  @IsString()
  targetName!: RoleName;

  @IsString()
  newName!: RoleName;
}
