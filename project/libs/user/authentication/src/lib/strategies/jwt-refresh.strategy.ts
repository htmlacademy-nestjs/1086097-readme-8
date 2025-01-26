import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';

import { jwtConfig } from '@project/config';
import { TokenPayload, RefreshTokenPayload } from '@project/core';
import { AuthenticationService } from '../authentication.service';
import { RefreshTokenService } from '../refresh-module/refresh-token.service';
import { TokenNotFoundException } from '../exceptions/exception';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService,
    private readonly refreshService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    const refreshToken = await this.refreshService.isExists(payload.tokenId);
    if (!refreshToken) {
      throw new TokenNotFoundException(payload.tokenId);
    }
    await this.refreshService.deleteRefreshSession(payload.tokenId)
    return this.authService.getUserByEmail(payload.email);
  }
}
