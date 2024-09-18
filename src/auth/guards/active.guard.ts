import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { TOKEN_PAYLOAD } from '../auth.const';
import { TokenPayloadDto } from '../dto/token-payload.dto';

@Injectable()
export class ActiveGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const payload: TokenPayloadDto = request[TOKEN_PAYLOAD];
      const user = await this.userService.findOne(payload.sub);

      if (!user.isActive) {
        throw new Error('User not Active');
      }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
}
