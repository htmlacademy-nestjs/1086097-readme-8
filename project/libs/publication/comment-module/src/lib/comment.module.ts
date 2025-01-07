import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PublicationRepository, PublicationFactory } from '@project/publication-module';
import { PublicationModule } from '@project/publication-module';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [PublicationModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, PublicationRepository, PublicationFactory],
  exports: [CommentService],
})
export class CommentModule {}


