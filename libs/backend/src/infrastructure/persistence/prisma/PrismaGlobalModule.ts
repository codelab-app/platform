import { Global, Module } from '@nestjs/common'
import { PrismaService } from './PrismaService'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaGlobalModule {}
