import { ElementApplicationModule } from '@codelab/backend/application/element'
import { StoreApplicationModule } from '@codelab/backend/application/store'
import { AppDomainModule } from '@codelab/backend/domain/app'
import { ComponentDomainModule } from '@codelab/backend/domain/component'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PageDomainModule } from '@codelab/backend/domain/page'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { StoreDomainModule } from '@codelab/backend/domain/store'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { PageApplicationController } from './page.application.controller'
import { PageApplicationService } from './page.application.service'
import { ExportPageHandler } from './use-case'

@Module({
  controllers: [PageApplicationController],
  exports: [PageApplicationService],
  imports: [
    AuthDomainModule,
    ElementApplicationModule,
    StoreApplicationModule,
    AppDomainModule,
    PageDomainModule,
    StoreDomainModule,
    PropDomainModule,
    TypeDomainModule,
    ComponentDomainModule,
    ElementDomainModule,
    CqrsModule,
  ],
  providers: [ExportPageHandler, PageApplicationService],
})
export class PageApplicationModule {}
