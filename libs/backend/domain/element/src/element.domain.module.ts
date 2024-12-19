import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { Module } from '@nestjs/common'

import { ElementRepository } from './repository'
import { ElementDescendantsService, ElementDomainService } from './service'
import { ElementDependantTypesService } from './service/element-dependant-types.service'

@Module({
  exports: [
    ElementRepository,
    ElementDomainService,
    ElementDescendantsService,
    ElementDependantTypesService,
  ],
  imports: [
    SharedDomainModule,
    AtomDomainModule,
    Neo4jModule,
    TypeDomainModule,
  ],
  providers: [
    ElementRepository,
    ElementDomainService,
    ElementDescendantsService,
    ElementDependantTypesService,
  ],
})
export class ElementDomainModule {}
