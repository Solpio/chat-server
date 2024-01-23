import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env"
  }), AuthModule, UsersModule, MongooseModule.forRoot(process.env.MONGODB_URI), ChatModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {
}
