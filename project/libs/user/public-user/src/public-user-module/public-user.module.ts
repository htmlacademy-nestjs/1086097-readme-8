import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicUserController } from './public-user.controller';
import { PublicUserRepository } from './public-user.repository';
import { PublicUserFactory } from './public-user.factory';
import { PublicUserSchema, PublicUserModel } from './public-user-model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: PublicUserModel.name, schema: PublicUserSchema }
  ])],
  controllers: [PublicUserController],
  providers: [PublicUserRepository, PublicUserFactory],
  exports: [PublicUserRepository],
})
export class PublicUserModule {}
