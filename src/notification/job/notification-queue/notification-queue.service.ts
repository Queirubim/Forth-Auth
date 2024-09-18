import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PayloadProps } from 'src/notification/notification.service';

@Injectable()
export class NotificationQueueService {
  constructor(
    @InjectQueue('send-notification') private sendNotificationQueue: Queue,
  ) {}

  async sendNotification(data: PayloadProps) {
    await this.sendNotificationQueue.add('send-notification', data);
  }
}
