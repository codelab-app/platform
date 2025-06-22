import { PageDomainModule } from '@codelab/backend-domain-page'
import { SharedDomainModule } from '@codelab/backend-domain-shared-modules'
import { Module } from '@nestjs/common'

import { AppRepository } from './repository'
import { AppDomainService } from './service'

@Module({
  exports: [AppRepository, AppDomainService],
  imports: [SharedDomainModule, PageDomainModule],
  providers: [AppRepository, AppDomainService],
})
export class AppDomainModule {}
