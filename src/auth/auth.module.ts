import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "src/users/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {JwtStrategy} from "src/auth/jwt.strategy";


@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    useFactory: ()=> ({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1d'}
    })
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
