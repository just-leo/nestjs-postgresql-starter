import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from 'nest-schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { AdvertModule } from './modules/advert/advert.module';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { TelegramBotModule } from './modules/telegram-bot/telegram-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ScheduleModule.register({
      enable: true,
      waiting: true,
    }),
    TypeOrmModule.forRoot(),
    AdvertModule,
    CrawlerModule,
    TelegramBotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  static port: number;
  static isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = configService.get('port');
    AppModule.isProduction = configService.get('isProduction');
  }
}
