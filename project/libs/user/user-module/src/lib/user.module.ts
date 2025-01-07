import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicUserController } from './user.controller';
import { PublicUserRepository } from './user.repository';
import { PublicUserFactory } from './user.factory';
import { PublicUserSchema, PublicUserModel } from './user-model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: PublicUserModel.name, schema: PublicUserSchema }
  ])],
  controllers: [PublicUserController],
  providers: [PublicUserRepository, PublicUserFactory],
  exports: [PublicUserRepository],
})
export class PublicUserModule {}
