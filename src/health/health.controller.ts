import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

import { Public } from '../decorators/permissions.decorator';

@Controller(`health`)
export class HealthController {
  constructor(
    private healthCheck: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator,
  ) {}

  @Get()
  @ApiExcludeEndpoint()
  @HealthCheck()
  @Public()
  async check(): Promise<HealthCheckResult> {
    return this.healthCheck.check([
      (): Promise<HealthIndicatorResult> =>
        this.mongooseHealth.pingCheck(`mongoose`),
    ]);
  }
}
