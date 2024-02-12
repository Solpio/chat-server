import {HttpException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UsersDocument} from "src/users/users.schema";
import {CreateUserDto} from "src/users/dto/create-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
  ) {
  }

  async createUser(dto: CreateUserDto) {
    const {password}: CreateUserDto = dto
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
      await this.userModel.create({...dto, password: hashedPassword});
    } catch (error) {
      throw new HttpException('Username must be unique', 500)
    }

    return true
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({username: username});
  }
}
