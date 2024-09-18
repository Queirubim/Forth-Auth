import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Test')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  @ApiOperation({
    summary: 'Test connection rote with server',
  })
  @ApiOkResponse({
    description: 'Return Hello World',
    example: 'Hello World!',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
