import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { Module } from '@nestjs/common'

import { ElementRepository } from './repository'
import { ElementDescendantsService, ElementDomainService } from './service'

@Module({
  exports: [ElementRepository, ElementDomainService, ElementDescendantsService],
  imports: [SharedDomainModule, AtomDomainModule, Neo4jModule],
  providers: [
    ElementRepository,
    ElementDomainService,
    ElementDescendantsService,
  ],
})
export class ElementDomainModule {}
