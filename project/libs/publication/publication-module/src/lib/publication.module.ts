import { Module } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationController } from './publication.controller';
import { PublicationFactory } from './publication.factory';
import { PrismaClientModule } from '@project/models';

@Module({
  imports: [PrismaClientModule],
  controllers: [PublicationController],
  providers: [PublicationRepository, PublicationFactory],
  exports: [PublicationRepository, PublicationFactory],
})
export class PublicationModule {}
