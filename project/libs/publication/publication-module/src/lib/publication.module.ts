import { Module } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationFactory } from './publication.factory';
import { PrismaClientModule } from '@project/models';
import { ValidateAuthorPipe } from '@project/pipes';

//насколько это всё нужно импортировать
import { JwtAccessStrategy } from 'libs/user/authentication/src/lib/strategies/jwt-access.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/config';
import { ConfigModule } from '@project/config';

@Module({
  imports: [PrismaClientModule, ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),],
  controllers: [PublicationController],
  providers: [JwtAccessStrategy, PublicationRepository, PublicationService, PublicationFactory, ValidateAuthorPipe],
  exports: [PublicationService],
})
export class PublicationModule {}

