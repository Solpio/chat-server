import {Body, Controller, Get, Post} from '@nestjs/common';
import {UsersService} from "src/users/users.service";
import {CreateUserDto} from "src/users/dto/create-user.dto";
import {UsersRoleEnum} from "src/users/enum/users-role.enum";
import {Public} from "src/auth/public-route.decorator";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async get() {
    console.log("213")
  }

  @Public()
  @Post("/create")
  async signUp(@Body() body: Omit<CreateUserDto, "role">) {
    return this.usersService.createUser({...body, role: [UsersRoleEnum.USER]})
  }
}
