import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ALREADY_REFISTERED_ERROR } from './auth.constants';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // To validate Auth dto during auth, the ValidationPipe is applied:
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.userService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REFISTERED_ERROR);
    }
    return this.userService.createUser(dto);
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    // either get user or throw exception:
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
