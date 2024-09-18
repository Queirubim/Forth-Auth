import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';

type SendEmailProps = {
  email: string;
  title: string;
  message: string;
};

type CreateNotificationProps = {
  id: number;
  title: string;
  message: string;
};

export type PayloadProps = {
  id: number;
  email: string;
  title: string;
  message: string;
};

@Injectable()
export class NotificationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly prismaService: PrismaService,
  ) {}

  async sendNotification({ email, title, message, id }: PayloadProps) {
    // envia email para o usuario
    await this.sendEmail({
      email,
      title,
      message,
    });

    // salva a mensagem no banco de dados
    await this.createNotification({
      id,
      title,
      message,
    });
  }

  private async sendEmail({ email, message, title }: SendEmailProps) {
    await this.emailService.sendEmail({
      email,
      subject: title,
      text: message,
    });
  }

  private async createNotification({
    id,
    title,
    message,
  }: CreateNotificationProps) {
    await this.prismaService.notification.create({
      data: {
        user_id: id,
        title,
        message,
      },
    });
  }
}
