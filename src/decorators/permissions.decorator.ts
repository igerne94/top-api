import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_ENDPOINT_PUBLIC_KEY = `top_api:is_endpoint_public`;

export const Public = (): CustomDecorator<string> =>
  SetMetadata(IS_ENDPOINT_PUBLIC_KEY, true);
