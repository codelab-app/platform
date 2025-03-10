import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { ImportDataMapperService } from '@codelab/backend/application/data'
import { DomainApplicationModule } from '@codelab/backend/application/domain'
import {
  ExportPageHandler,
  ImportPageHandler,
  PageApplicationModule,
} from '@codelab/backend/application/page'
import { TypeApplicationModule } from '@codelab/backend/application/type'
import { AppDomainModule } from '@codelab/backend/domain/app'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { ComponentDomainModule } from '@codelab/backend/domain/component'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PageDomainModule } from '@codelab/backend/domain/page'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { ResourceDomainModule } from '@codelab/backend/domain/resource'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { StoreDomainModule } from '@codelab/backend/domain/store'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { SEED_QUEUE } from '@codelab/backend/infra/adapter/queue'
import { WsModule } from '@codelab/backend/infra/adapter/ws'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { AppApplicationController } from './app.application.controller'
import { DemoController } from './demo.controller'
import {
  ExportAppHandler,
  ImportAppHandler,
  SeedE2eAppHandler,
} from './use-case'

@Module({
  controllers: [AppApplicationController, DemoController],
  exports: [],
  imports: [
    WsModule,
    AtomDomainModule,
    AuthDomainModule,
    AppDomainModule,
    PageDomainModule,
    AtomApplicationModule,
    PageApplicationModule,
    TypeApplicationModule,
    PropDomainModule,
    ComponentDomainModule,
    ElementDomainModule,
    StoreDomainModule,
    ResourceDomainModule,
    TypeDomainModule,
    DomainApplicationModule,
    CqrsModule,
    Neo4jModule,
  ],
  providers: [
    SeedE2eAppHandler,
    ImportAppHandler,
    ExportAppHandler,
    ImportDataMapperService,
  ],
})
export class AppApplicationModule {}
