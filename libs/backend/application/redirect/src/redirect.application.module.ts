import { AuthGuardDomainModule } from '@codelab/backend/domain/auth-guard'
import { PageDomainModule } from '@codelab/backend/domain/page'
import { RedirectDomainModule } from '@codelab/backend/domain/redirect'
import { Module } from '@nestjs/common'

import { RedirectController } from './redirect.controller'

@Module({
  controllers: [RedirectController],
  imports: [RedirectDomainModule, PageDomainModule, AuthGuardDomainModule],
})
export class RedirectApplicationModule {}
