import { AuthGuard } from '@nestjs/passport';

/**
 * It automatically uses JwtStrategy
 * to validate the JWT of incoming requests.
 * If the token is valid,
 * the request is allowed to proceed;
 * if not, it throws an exception.
 */
export class JwtAuthGuard extends AuthGuard('jwt') {}
