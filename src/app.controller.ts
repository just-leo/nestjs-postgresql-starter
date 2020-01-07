import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { AppService } from './app.service';

@ApiTags('healthcheck')
@Controller()
export class AppController extends NestSchedule {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Health check route' })
  @ApiResponse({ status: 200, description: 'Ok' })
  healthCheck(): string {
    return this.appService.getStatus();
  }

  @Cron('*/5 * * * *', { immediate: false })
  cronJob() {
    this.logger.log('Cron job started');
  }
}
