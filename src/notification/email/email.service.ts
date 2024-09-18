import { Inject, Injectable } from '@nestjs/common';
import { EmailProvider } from './email.provider';
import { SentMessageInfo, Transporter } from 'nodemailer';

type SendEmail = {
  subject: string;
  email: string;
  text: string;
  html?: string;
};

@Injectable()
export class EmailService {
  constructor(
    @Inject(EmailProvider.provide)
    private readonly emailProvider: Transporter<SentMessageInfo>,
  ) {}

  async sendEmail(data: SendEmail) {
    await this.emailProvider.sendMail({
      from: process.env.EMAIL_SENDER,
      to: data.email,
      replyTo: process.env.EMAIL_RECEIVER,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
  }
}
