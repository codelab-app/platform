import { PreferenceDomainModule } from '@codelab/backend/domain/preference'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { Module } from '@nestjs/common'
import { SeederDomainService } from './seeder.domain.service'

@Module({
  exports: [SeederDomainService],
  imports: [AuthDomainModule, UserDomainModule, PreferenceDomainModule],
  providers: [SeederDomainService],
})
export class SeederDomainModule {}
