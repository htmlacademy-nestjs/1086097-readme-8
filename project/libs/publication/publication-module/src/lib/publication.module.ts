import { Module } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationFactory } from './publication.factory';
import { PrismaClientModule } from '@project/models';
// import { AuthenticationModule } from '@project/authentication';

@Module({
  imports: [PrismaClientModule],
  controllers: [PublicationController],
  providers: [PublicationRepository, PublicationService, PublicationFactory],
  exports: [PublicationRepository, PublicationService, PublicationFactory],
})
export class PublicationModule {}
