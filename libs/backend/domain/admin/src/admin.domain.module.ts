import { SharedDomainModule } from '@codelab/backend/domain/shared'
import { Module } from '@nestjs/common'
import { AdminRepository } from './admin.repo.service'

@Module({
  exports: [AdminRepository],
  imports: [SharedDomainModule],
  providers: [AdminRepository],
})
export class AdminDomainModule {}
