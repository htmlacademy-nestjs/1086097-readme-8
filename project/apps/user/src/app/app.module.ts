import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@project/authentication';
import { PublicUserModule } from '@project/public-user';
// import { PublicationModule } from '@project/publication-module';


@Module({
  imports: [AuthenticationModule, PublicUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
