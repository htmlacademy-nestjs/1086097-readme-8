import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PublicUserModule, PublicUserSchema, PublicUserModel } from '@project/public-user';

@Module({
  imports: [PublicUserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}
