import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user/user.service';
import { RedisService } from 'src/app/configs/redis.config';
import { NotificationQueueService } from 'src/notification/job/notification-queue/notification-queue.service';
import { HashingService } from './hashing/hashing.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '@prisma/client';
import { ActivationDto } from './dto/activation.dto';
import { random } from 'src/app/utils/random';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly redisService: RedisService,
    private readonly notificationQueue: NotificationQueueService,
    private readonly prismaService: PrismaService,
  ) {}

  private jwtConfig() {
    return {
      audience: process.env.JWT_TOKEN_AUDIENCE,
      issuer: process.env.JWT_TOKEN_ISSUER,
      secret: process.env.JWT_TOKEN_SECRET,
    };
  }

  async login(data: LoginDto) {
    const user = await this.userService.findOne(data.email);

    const isTruePassword = await this.hashingService.compare(
      data.password,
      user.password,
    );

    if (!isTruePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // if (!user.isActive) {
    //   throw new ForbiddenException(
    //     'Please check your email and activate your account.',
    //   );
    // }
    return this.createTokens(user);
  }

  private async createTokens(user: User) {
    const accessTokenPromise = this.signJwtAsync<Partial<User>>(
      user.id,
      Number(process.env.JWT_TTL),
      { email: user.email },
    );

    const refreshTokenPromise = this.signJwtAsync(
      user.id,
      Number(process.env.JWT_REFRESH_TTL),
    );

    // Ajuda a Reduzir o Lag
    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signJwtAsync<T>(sub: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      { ...this.jwtConfig(), expiresIn },
    );
  }

  async refreshTokens(data: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(data.refreshToken, {
        ...this.jwtConfig(),
      });

      const user = await this.userService.findOne(sub);

      return this.createTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async activation(data: ActivationDto, tokenPayload: TokenPayloadDto) {
    const id = tokenPayload.sub;
    const activationKey = await this.redisService.get(`user-activation-${id}`);

    if (data.activationKey !== +activationKey) {
      throw new UnauthorizedException('Unknown key');
    }

    await this.prismaService.user.update({
      where: { id },
      data: { isActive: true },
    });
  }

  async verify(tokenPayload: TokenPayloadDto) {
    const activationKey = random(1000, 9999);
    this.redisService.set(
      `user-activation-${tokenPayload.sub}`,
      activationKey.toString(),
      'EX',
      3 * 60,
    );

    try {
      await this.notificationQueue.sendNotification({
        email: tokenPayload.email,
        id: tokenPayload.sub,
        message: `Your key is ${activationKey}`,
        title: 'Activation Key',
      });
      return { message: 'Your activation key has been sent to your email!' };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
