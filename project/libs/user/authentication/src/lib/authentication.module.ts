import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { UserModule } from '@project/user-module';
import { getJwtOptions } from '@project/config';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserNotifyModule } from '@project/user-notify';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from './refresh-module/refresh-token.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserNotifyModule,
    RefreshTokenModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy, LocalStrategy, JwtRefreshStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
