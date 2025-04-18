import { PreferenceDomainModule } from '@codelab/backend-domain-preference'
import { SharedDomainModule } from '@codelab/backend-domain-shared-modules'
import { Module } from '@nestjs/common'

import { UserRepository } from './repository'
import { UserDomainService } from './repository/user.domain.service'

@Module({
  exports: [UserRepository, UserDomainService],
  imports: [PreferenceDomainModule, SharedDomainModule],
  providers: [UserRepository, UserDomainService],
})
export class UserDomainModule {}
