import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from '../user.model';

@Injectable()
// checks the genetated jwt and allow/not allow to access a route
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    // we need to pass to super those fileds, what the class extends from PassportStrategy
    super({
      // It specifies how the JWT should be extracted from the request:
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // This method decodes and validates the JWT.
  // The object returned from validate
  //...is injected into the request object
  //...for any route that's guarded by this strategy
  async validate({ email }: Pick<UserModel, 'email'>) {
    return email;
  }
}
// this strategy is a provider, so it should be @Injectable and be added to the auth module providers:
