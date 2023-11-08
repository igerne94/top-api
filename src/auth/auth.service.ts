import { UserModel } from './user.model';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto.controller/auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  async createUser(dto: AuthDto) {
    console.log(dto);
    const salt = await genSalt(10);
    const newUser = await this.userModel.create({
      email: dto.login,
      passwordHash: hashSync(dto.password, salt),
      salt,
    });
    console.log(newUser);
    return newUser.save();
  }

  async findUser(email: string) {
    console.log(email);
    return this.userModel.findOne({ email }).exec();
  }
}
