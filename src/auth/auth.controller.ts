import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto.controller/auth.dto';

@Controller('auth')
export class AuthController {
  // To validate Auth dto data during auth, the ValidationPipe is applied:
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    console.log(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login() {}
}
