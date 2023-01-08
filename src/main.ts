import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SystemExceptionFilter } from "./app.filter";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug']
  });
  const contextPath = '/admin/api'

  app.useGlobalFilters(
    app.get(SystemExceptionFilter)
  );
  app.setGlobalPrefix(contextPath)
  app.useGlobalPipes(new ValidationPipe({skipUndefinedProperties: true}))

  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  const config = new DocumentBuilder()
    .setTitle('Shooping Admin API')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap()
  .catch((e) => {
    console.log(`Server encounted exception ${e}`)
  });
