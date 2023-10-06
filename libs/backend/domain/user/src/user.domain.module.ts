import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { UserRepository } from './repository'

@Module({
  exports: [UserRepository],
  imports: [SharedDomainModule],
  providers: [UserRepository],
})
export class UserDomainModule {}
