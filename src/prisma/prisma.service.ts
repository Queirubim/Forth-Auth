import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // OnModuleInit é uma interface que é executada quando o modulo iniciar.
  async onModuleInit() {
    await this.$connect();
  }
}
