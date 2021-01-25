import { Global, Module } from '@nestjs/common'
import { PrismaDITokens } from './PrismaDITokens'
import { prismaProviders } from './PrismaProviders'

@Global()
@Module({
  providers: [...prismaProviders],
  exports: [PrismaDITokens.PrismaService],
})
export class PrismaModule {}
