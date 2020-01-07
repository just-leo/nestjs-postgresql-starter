import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from 'nest-schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import config from './config';

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
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  static port: number;
  static hostname: string;
  static isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = configService.get('port');
    AppModule.hostname = configService.get('hostname');
    AppModule.isProduction = configService.get('isProduction');
  }
}
