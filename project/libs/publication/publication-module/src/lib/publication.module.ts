import { Module } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationFactory } from './publication.factory';
import { PrismaClientModule } from '@project/models';
import { ValidateAuthorPipe } from '@project/pipes';
import { PublicationNotifyModule } from './notify/notify.module';


@Module({
  imports: [PrismaClientModule, PublicationNotifyModule],
  controllers: [PublicationController],
  providers: [PublicationRepository, PublicationService, PublicationFactory, ValidateAuthorPipe],
  exports: [PublicationService],
})
export class PublicationModule {}
