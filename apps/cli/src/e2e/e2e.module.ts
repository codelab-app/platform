import { serverConfig, ServerTokens } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ServerModule } from '../server'
import { E2eService } from './e2e.service'

@Module({
  imports: [ServerModule],
  providers: [
    E2eService,
    {
      provide: ServerTokens.ServerConfig,
      useValue: serverConfig(),
    },
  ],
  exports: [E2eService],
})
export class E2eModule {}
