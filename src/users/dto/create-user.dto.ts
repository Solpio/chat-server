import {
  IsArray,
  IsString
} from 'class-validator';

import {UsersRoleEnum} from "src/users/enum/users-role.enum";
export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsArray()
  readonly role: UsersRoleEnum[];
}
