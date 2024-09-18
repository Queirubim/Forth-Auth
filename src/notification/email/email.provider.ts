import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'judd.murphy89@ethereal.email',
    pass: 'SqjU6KKrpvGsYfR3TY',
  },
});

export const EmailProvider = {
  provide: 'EMAIL_PROVIDER',
  useValue: transporter,
};
