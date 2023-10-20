import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { AtomRepository } from './repository'

@Module({
  exports: [AtomRepository],
  imports: [SharedDomainModule],
  providers: [AtomRepository],
})
export class AtomDomainModule {}
