import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from './email/email.service';
import { EmailProvider } from './email/email.provider';
import { NotificationQueueService } from './job/notification-queue/notification-queue.service';
import { NotificationConsumerService } from './job/notification-consumer/notification-consumer.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'send-notification' }),
  ],
  providers: [
    NotificationService,
    PrismaService,
    EmailService,
    EmailProvider,
    NotificationQueueService,
    NotificationConsumerService,
  ],
  exports: [NotificationService, NotificationQueueService],
})
export class NotificationModule {}
