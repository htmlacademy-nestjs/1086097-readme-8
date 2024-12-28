import { Module, Global } from '@nestjs/common';
import { PrismaClientService } from './prisma-client.service';

@Global()
@Module({
  exports: [PrismaClientService],
  providers: [PrismaClientService]

})

export class PrismaClientModule {}
