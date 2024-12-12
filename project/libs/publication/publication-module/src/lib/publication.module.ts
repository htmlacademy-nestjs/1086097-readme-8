import { Module } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationController } from './publication.controller';
import { PublicationFactory } from './publication.factory';

@Module({
  controllers: [PublicationController],
  providers: [PublicationRepository, PublicationFactory],
  exports: [PublicationRepository, PublicationFactory],
})
export class PublicationModule {}
