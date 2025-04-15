import { SharedDomainModule } from '@codelab/backend-domain-shared-modules'
import { Module } from '@nestjs/common'

import { RedirectRepository } from './repository'

@Module({
  exports: [RedirectRepository],
  imports: [SharedDomainModule],
  providers: [RedirectRepository],
})
export class RedirectDomainModule {}
