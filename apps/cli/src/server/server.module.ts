import { graphqlServerConfig } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServerService } from './server.service'

@Module({
  imports: [ConfigModule.forFeature(graphqlServerConfig)],
  providers: [ServerService],
  exports: [ServerService],
})
export class ServerModule {}
