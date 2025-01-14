import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '@project/authentication';
import { UserModule } from '@project/user-module';
import { ConfigModule, getMongooseOptions } from '@project/config';

@Module({
  imports: [AuthenticationModule, UserModule, ConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
