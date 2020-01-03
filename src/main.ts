import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('api');
  // app.useGlobalFilters();

  if (!AppModule.isProduction) {
    const options = new DocumentBuilder()
      .setTitle('NestJS Realworld Example App')
      .setDescription('The Realworld API description')
      .setVersion('1.0')
      .addTag('api')
      // .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/docs', app, document);

    Logger.verbose(`App docs available at /docs url`);
  }
  Logger.debug(`App started on ${AppModule.port} port`);
  await app.listen(AppModule.port);
}
bootstrap();
