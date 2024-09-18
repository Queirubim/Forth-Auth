import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiDocGenericPost } from 'src/app/common/api-doc-generic-post.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ActivationDto } from './dto/activation.dto';
import { AuthGuard } from './guards/auth.guard';
import { TokenPayloadParam } from './params/token-payload.param';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PresenterLoginDto } from './user/dto/responses.dto';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login
  @Post('login')
  @ApiOperation({
    summary: 'Get the JWT bearer token as API key.',
  })
  @ApiDocGenericPost('auth', PresenterLoginDto)
  create(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  // Verify
  @UseGuards(AuthGuard)
  @Post('verify')
  @ApiOperation({
    summary: "Send activation key to user's email",
  })
  @ApiCreatedResponse({
    description: 'The Verify successfully created',
    example: {
      message: 'Your activation key has been sent to your email!',
    },
  })
  @ApiDocGenericPost('Verify')
  verify(@TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.authService.verify(tokenPayload);
  }

  // Activate
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'User activation route to access an API.',
  })
  @Post('activate')
  @ApiDocGenericPost('Activate')
  activate(
    @Body() data: ActivationDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.authService.activation(data, tokenPayload);
  }

  // Refresh
  @Post('refresh')
  @ApiOperation({
    summary: 'Route to stay logged into the API for longer.',
  })
  @ApiDocGenericPost('Refresh Token', PresenterLoginDto)
  refreshTokens(@Body() data: RefreshTokenDto) {
    return this.authService.refreshTokens(data);
  }
}
