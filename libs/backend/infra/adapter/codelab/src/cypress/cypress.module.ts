import { AppDomainModule } from '@codelab/backend/domain/app'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PageDomainModule } from '@codelab/backend/domain/page'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { StoreDomainModule } from '@codelab/backend/domain/store'
import { TagDomainModule } from '@codelab/backend/domain/tag'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Neo4jModule, OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CypressController } from './cypress.controller'
import { SeedAppHandler } from './seed-app.command.service'
import { SeedAtomHandler } from './seed-atom.command.service'
import { SeedTagHandler } from './seed-tag.command.service'
import { SeedTypeHandler } from './seed-type.command.service'

@Module({
  controllers: [CypressController],
  imports: [
    CqrsModule,
    OGMModule,
    Neo4jModule,
    AppDomainModule,
    AtomDomainModule,
    PageDomainModule,
    PropDomainModule,
    ElementDomainModule,
    StoreDomainModule,
    TypeDomainModule,
    TagDomainModule,
  ],
  providers: [SeedAppHandler, SeedAtomHandler, SeedTagHandler, SeedTypeHandler],
})
export class CypressModule {}
