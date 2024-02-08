import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { AtomRepository } from './repository'
import { AtomDomainService } from './service/atom.domain.service'

@Module({
  exports: [AtomRepository, AtomDomainService],
  imports: [SharedDomainModule],
  providers: [AtomRepository, AtomDomainService],
})
export class AtomDomainModule {}
