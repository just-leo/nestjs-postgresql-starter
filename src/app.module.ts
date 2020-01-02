import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from 'nest-schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { AdvertModule } from './modules/advert/advert.module';
import { CrawlerModule } from './modules/crawler/crawler.module';

@Module({
  imports: [
    ScheduleModule.register({
      enable: true,
      waiting: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AdvertModule,
    CrawlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
