import { UserModel } from './user.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    // typezied the return value:
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.userService.findUser(email);
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
