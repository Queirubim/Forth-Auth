import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Query,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPresenter } from './presenter/user.presenter';
import { ApiDocGenericPost } from 'src/app/common/api-doc-generic-post.decorator';
import { ApiConflictResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';
import { TokenPayloadParam } from '../params/token-payload.param';
import { TokenPayloadDto } from '../dto/token-payload.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ActiveGuard } from '../guards/active.guard';
import { PresenterUserDto } from './dto/responses.dto';
import { ApiDocGenericPatch } from 'src/app/common/api-doc-generic-patch.decorator';
import { ApiDocGenericDelete } from 'src/app/common/api-doc-generic-delete.decorator';
import { ApiDocGenericGetAll } from 'src/app/common/api-doc-generic-get-all.decorator';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //--Note-- No Swagger caso um decorator repetido for executado, o mais a cima terá prioridade;
  @Post()
  @ApiDocGenericPost('user', PresenterUserDto)
  @ApiConflictResponse({ description: 'Conflict' })
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data);
    return new UserPresenter(user);
  }

  // Apenas para Testes
  @UseGuards(AuthGuard, ActiveGuard)
  @ApiDocGenericGetAll('user', PresenterUserDto)
  @Get()
  findMany(@Query() pagination: PaginationDto) {
    return this.userService.findMany(pagination);
  }

  //--Note-- ParseIntPipe tenta converter o parametro de string pra number
  @UseGuards(AuthGuard, ActiveGuard)
  @ApiDocGenericPatch('user', UpdateUserDto)
  @Patch()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.userService.update(updateUserDto, tokenPayload);
  }

  @UseGuards(AuthGuard, ActiveGuard)
  @ApiDocGenericDelete('user')
  @Delete()
  remove(@TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.userService.delete(tokenPayload);
  }
}
