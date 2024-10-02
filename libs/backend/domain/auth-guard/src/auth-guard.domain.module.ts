import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'

import { AuthGuardRepository } from './repository'

@Module({
  exports: [AuthGuardRepository],
  imports: [SharedDomainModule],
  providers: [AuthGuardRepository],
})
export class AuthGuardDomainModule {}
