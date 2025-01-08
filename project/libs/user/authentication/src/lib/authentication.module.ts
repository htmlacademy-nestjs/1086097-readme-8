import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '@project/user-module';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { getJwtOptions } from '@project/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
