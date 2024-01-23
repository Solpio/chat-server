import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "src/users/dto/create-user.dto";
import {AuthService} from "src/auth/auth.service";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {Public} from "src/auth/public-route.decorator";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Public()
  @Post()
  async signIn(@Body() body: Omit<CreateUserDto, "role">){
      return this.authService.validateUser(body)
  }

  @Post("/test")
  async testAuth() {
      console.log('test')
  }
}
