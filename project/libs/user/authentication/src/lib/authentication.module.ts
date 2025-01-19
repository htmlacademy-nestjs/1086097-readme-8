import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtAccessStrategy } from './jwt-access.strategy';
import { UserModule } from '@project/user-module';
import { getJwtOptions } from '@project/config';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserNotifyModule } from '@project/user-notify';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserNotifyModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
