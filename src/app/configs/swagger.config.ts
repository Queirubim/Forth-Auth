import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function addSwagger(app: INestApplication) {
  const configService = app.get<ConfigService>(ConfigService);

  const apiName = configService.get<string>('API_NAME');
  const apiServer = configService.get<string>('API_SERVICE');
  const apiDescription = configService.get<string>('API_DESCRIPTION');
  const apiTags = configService.get<string>('API_TAGS');

  const config = new DocumentBuilder()
    .setTitle(apiName)
    .setDescription(apiDescription)
    .addServer(apiServer)
    .setVersion('1.0')
    .addTag(apiTags);

  const configBuilder = config.build();
  const document = SwaggerModule.createDocument(app, configBuilder);
  // Acessa a documentação através de localhost:3000/api
  SwaggerModule.setup('api', app, document);
}
