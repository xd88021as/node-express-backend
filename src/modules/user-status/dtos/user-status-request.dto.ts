import { IsString } from 'class-validator';

export class UserStatusCreateDTO {
  @IsString()
  name!: string;
}

export class UserStatusUpdateDTO {
  @IsString()
  targetName!: string;

  @IsString()
  newName!: string;
}
