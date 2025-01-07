import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '@project/authentication';
import { PublicUserModule } from '@project/user-module';
// import { PublicationModule } from '@project/publication-module';
import { ConfigModule, getMongooseOptions } from '@project/config';

@Module({
  imports: [AuthenticationModule, PublicUserModule, ConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
