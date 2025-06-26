import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { RequestWithCookies } from '../interfaces/request-cookies.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestWithCookies) =>
          request?.cookies?.Authentication || null,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate({ userId }: TokenPayload) {
    return await this.usersService.getUser({ _id: userId });
  }
}
