import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { PublicationModule } from '@project/publication-module';

@Module({
  imports: [PublicationModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
  exports: [LikeService],
})
export class LikeModule {}
