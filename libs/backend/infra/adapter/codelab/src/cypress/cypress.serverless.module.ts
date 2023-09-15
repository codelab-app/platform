import {
  AppApplicationModule,
  SeedCypressAppHandler,
} from '@codelab/backend/application/app'
import { SeedCypressAtomsHandler } from '@codelab/backend/application/atom'
import { SeedCypressTagsHandler } from '@codelab/backend/application/tag'
import { SeedCypressTypesHandler } from '@codelab/backend/application/type'
import { AppDomainModule } from '@codelab/backend/domain/app'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PageDomainModule } from '@codelab/backend/domain/page'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { StoreDomainModule } from '@codelab/backend/domain/store'
import { TagDomainModule } from '@codelab/backend/domain/tag'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Neo4jModule, OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CypressController } from './cypress.controller'

@Module({
  controllers: [CypressController],
  imports: [
    /**
     * Global modules
     */
    OtelModule,
    /**
     * Others
     */
    CqrsModule,
    /**
     * Domain
     */
    AppDomainModule,
    AtomDomainModule,
    PageDomainModule,
    PropDomainModule,
    ElementDomainModule,
    StoreDomainModule,
    TypeDomainModule,
    TagDomainModule,
    /**
     * Application
     */
    AppApplicationModule,
  ],
  providers: [
    // SeedCypressAppHandler,
    // SeedCypressAtomsHandler,
    // SeedCypressTagsHandler,
    // SeedCypressTypesHandler,
  ],
})
export class CypressServerlessModule {}
