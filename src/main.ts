import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.setGlobalPrefix('api');
  // app.useGlobalFilters();
  app.useGlobalPipes(new ValidationPipe());

  if (!AppModule.isProduction) {
    const options = new DocumentBuilder()
      .setTitle('NestJS Realworld Example App')
      .setDescription('The Realworld API description')
      .setVersion('1.0')
      .addTag('api')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/docs', app, document);

    logger.verbose(`App docs available at /docs url`);
  }
  logger.log(`App started on ${AppModule.hostname}:${AppModule.port}`);
  await app.listen(AppModule.port, AppModule.hostname);
}
bootstrap();
