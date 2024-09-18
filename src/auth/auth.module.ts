import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BullModule } from '@nestjs/bullmq';
import { NotificationQueueService } from 'src/notification/job/notification-queue/notification-queue.service';
import { RedisService } from 'src/app/configs/redis.config';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        audience: String(process.env.JWT_AUDIENCE),
        issuer: String(process.env.JWT_ISSUER),
        expiresIn: String(process.env.JWT_TTL),
      },
    }),
    // --Note-- Onde for usar o serviço de queue tem que importar o registerQueue
    BullModule.registerQueue({ name: 'send-notification' }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    UserService,
    AuthService,
    PrismaService,
    RedisService,
    NotificationQueueService,
  ],
})
export class AuthModule {}
