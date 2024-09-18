import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';

@Module({
  // --Note-- Importa os Modulos
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    NotificationModule,
  ],
  controllers: [AppController],
  // --Note-- Prover os Serviços
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
