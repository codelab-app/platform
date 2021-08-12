import { serverConfig } from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServerModule } from '../server'
import { E2eService } from './e2e.service'

@Module({
  imports: [ServerModule, ConfigModule.forFeature(serverConfig)],
  providers: [E2eService],
  exports: [E2eService],
})
export class E2eModule {}
