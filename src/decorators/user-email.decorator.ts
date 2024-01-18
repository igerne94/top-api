//Custom decorator to get data from the request object.
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserEmail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(); //http context
    return request.user;
  },
);
