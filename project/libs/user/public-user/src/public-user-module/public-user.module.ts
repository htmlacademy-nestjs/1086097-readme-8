import { Module } from '@nestjs/common';
import { PublicUserController } from './public-user.controller';
import { PublicUserRepository } from './public-user.repository';
import { PublicUserFactory } from './public-user.factory';

@Module({
  controllers: [PublicUserController],
  providers: [PublicUserRepository, PublicUserFactory],
  exports: [PublicUserRepository],
})
export class PublicUserModule {}
