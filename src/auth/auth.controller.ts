import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto.controller/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() dto: AuthDto) {
    console.log(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login() {}
}
