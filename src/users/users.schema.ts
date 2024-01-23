import { Document, now, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {UsersRoleEnum} from "src/users/enum/users-role.enum";
export type UsersDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    default: [UsersRoleEnum.USER],
    type: [String],
  })
  role: UsersRoleEnum[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(User);
