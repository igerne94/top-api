import { UserModel } from './user.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto.controller/auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  // these 2 functions could be moved to a separate service:
  //#1:
  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = await this.userModel.create({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }
  //#2:
  async findUser(email: string) {
    console.log(email);
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
    // typezied the return value:
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) throw new UnauthorizedException(USER_NOT_FOUND_ERROR);

    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword)
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);

    // typezied retun value:
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
