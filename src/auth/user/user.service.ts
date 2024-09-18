import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';
import { HashingService } from '../hashing/hashing.service';
import { TokenPayloadDto } from '../dto/token-payload.dto';
import { UserPresenter } from './presenter/user.presenter';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async create(data: CreateUserDto) {
    const user = await this.findOne(data.email);

    if (user) {
      throw new ConflictException('Email already exists');
    }

    const newUser = await this.prismaService.user.create({
      data: {
        ...data,
        password: await this.hashingService.hash(data.password),
      },
    });
    return newUser;
  }

  async findOne(emailOrId: string | number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        ...(typeof emailOrId === 'number'
          ? { id: emailOrId }
          : { email: emailOrId }),
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(updateUserDto: UpdateUserDto, tokenPayload: TokenPayloadDto) {
    const user = await this.findOne(tokenPayload.sub);
    let password = updateUserDto.password;

    if (user.id !== tokenPayload.sub) {
      throw new UnauthorizedException();
    }

    if (password) {
      password = await this.hashingService.hash(password);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: tokenPayload.sub },
      data: {
        ...updateUserDto,
        password,
      },
    });

    return new UserPresenter(updatedUser);
  }

  async delete(tokenPayload: TokenPayloadDto) {
    const user = await this.findOne(tokenPayload.sub);

    if (user.id !== tokenPayload.sub) {
      throw new UnauthorizedException();
    }

    await this.prismaService.user.delete({ where: { id: tokenPayload.sub } });
  }

  // Apenas para Testar Paginação
  findMany(pagination?: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;
    return this.prismaService.user.findMany({
      take: limit,
      skip: offset,
    });
  }
}
