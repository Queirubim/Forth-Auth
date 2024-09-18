import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import {
  NotificationService,
  PayloadProps,
} from 'src/notification/notification.service';

@Processor('send-notification')
export class NotificationConsumerService extends WorkerHost {
  constructor(private notificationService: NotificationService) {
    super();
  }
  async process(job: Job<PayloadProps>) {
    await this.notificationService.sendNotification(job.data);
    // switch (action) {
    //   case 'welcome': {
    //     await this.notificationService.welcomeNotification(payload.user_id);
    //     break;
    //   }
    //   case 'activate': {
    //     await this.notificationService.activationNotification(payload.user_id);
    //   }
    // }
  }
}
