import { Module} from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UsersSchema} from "src/users/users.schema";
import {UsersController} from "src/users/users.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {
}
