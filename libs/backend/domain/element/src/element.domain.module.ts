import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'

import { ElementRepository } from './repository'
import { ElementDomainService } from './service'

@Module({
  exports: [ElementRepository, ElementDomainService],
  imports: [SharedDomainModule, AtomDomainModule],
  providers: [ElementRepository, ElementDomainService],
})
export class ElementDomainModule {}
