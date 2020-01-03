import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('healthcheck')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Health check route' })
  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  healthCheck(): string {
    return this.appService.getAppStatus();
  }
}
