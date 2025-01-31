import { Module } from '@nestjs/common';
import { PublicationModule } from '@project/publication-module';
import { CommentModule } from '@project/comment-module';
import { LikeModule } from '@project/like-module';
import { PublicationConfigModule, ConfigModule } from '@project/config';

@Module({
  imports: [PublicationModule, CommentModule, LikeModule, PublicationConfigModule, ConfigModule],
  controllers: [],
  providers: [PublicationModule, CommentModule, LikeModule],
})
export class AppModule {}
