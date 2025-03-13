import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { ComponentApplicationModule } from '@codelab/backend/application/component'
import { DomainApplicationModule } from '@codelab/backend/application/domain'
import { PageApplicationModule } from '@codelab/backend/application/page'
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
import { WsModule } from '@codelab/backend/infra/adapter/ws'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { AppApplicationController } from './app.application.controller'
import { DemoController } from './demo.controller'
import { AppApplicationService } from './services/app.application.service'
import { ExportAppHandler, SeedAppHandler } from './use-case'

@Module({
  controllers: [AppApplicationController, DemoController],
  exports: [],
  imports: [
    WsModule,
    PageApplicationModule,
    AtomDomainModule,
    AuthDomainModule,
    AppDomainModule,
    PageDomainModule,
    AtomApplicationModule,
    PageApplicationModule,
    TypeApplicationModule,
    ComponentApplicationModule,
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
  providers: [SeedAppHandler, ExportAppHandler, AppApplicationService],
})
export class AppApplicationModule {}
