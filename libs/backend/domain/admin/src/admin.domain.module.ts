import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { AdminRepository } from './repository/admin.repo.service'

@Module({
  exports: [AdminRepository],
  imports: [SharedDomainModule],
  providers: [AdminRepository],
})
export class AdminDomainModule {}
