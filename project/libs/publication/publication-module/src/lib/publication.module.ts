import { Module } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationFactory } from './publication.factory';
import { PrismaClientModule } from '@project/models';
import { PublicationNotifyModule } from './notify/notify.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [PrismaClientModule, PublicationNotifyModule, HttpModule],
  controllers: [PublicationController],
  providers: [PublicationRepository, PublicationService, PublicationFactory],
  exports: [PublicationService],
})
export class PublicationModule {}
