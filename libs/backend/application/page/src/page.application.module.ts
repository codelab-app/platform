import { ComponentDomainModule } from '@codelab/backend/domain/component'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PageDomainModule } from '@codelab/backend/domain/page'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PageApplicationController } from './page.application.controller'
import { PageApplicationService } from './page.application.service'
import { ExportPageHandler, ImportPageHandler } from './use-case'

@Module({
  controllers: [PageApplicationController],
  exports: [],
  imports: [
    AuthDomainModule,
    PageDomainModule,
    PropDomainModule,
    ComponentDomainModule,
    ElementDomainModule,
    CqrsModule,
  ],
  providers: [ExportPageHandler, ImportPageHandler, PageApplicationService],
})
export class PageApplicationModule {}
