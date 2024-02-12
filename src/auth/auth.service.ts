import {HttpException, Injectable} from '@nestjs/common';
import {UsersService} from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {CreateUserDto} from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {
  }

    async validateUser({username, password}: Omit<CreateUserDto, "role">) {
      const user = await this.userService.findByUsername(username)
      if (!user) {
        throw new HttpException('Wrong username or password', 500)
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) {
        throw new HttpException('Wrong username or password', 500)
      }
      console.log(isPasswordMatch)
      if (isPasswordMatch) {
        const token = await this.jwtService.signAsync({
          username: user.username,
          userId: user.id
        })
        return token
      }
    }
  }
