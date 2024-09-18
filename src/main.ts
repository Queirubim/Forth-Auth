import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { addSwagger } from './app/configs/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get<string>('PORT');
  addSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //--Note-- remove chaves que não estão no DTO
      forbidNonWhitelisted: true, //--Note-- lenvanta erro quando a chave não existir
    }),
  );

  await app.listen(PORT, () =>
    console.warn('\x1b[36m%s\x1b[0m', `server running in localhost:${PORT}`),
  );
}
bootstrap();
