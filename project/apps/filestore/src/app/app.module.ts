import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileStoreConfigModule } from '@project/config';
import { FileStoreModule } from '@project/file-store';
import { getFileStoreMongooseOptions } from '@project/config';


@Module({
  imports: [
    FileStoreConfigModule,
    FileStoreModule,
    MongooseModule.forRootAsync(getFileStoreMongooseOptions())],
  controllers: [],
  providers: [],
})
export class AppModule {}
