import { ComponentDomainModule } from '@codelab/backend/domain/component'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PageDomainModule } from '@codelab/backend/domain/page'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportPageHandler, ImportPageHandler } from './use-case'

@Module({
  controllers: [],
  exports: [],
  imports: [
    AuthDomainModule,
    PageDomainModule,
    PropDomainModule,
    ComponentDomainModule,
    ElementDomainModule,
    CqrsModule,
  ],
  providers: [ExportPageHandler, ImportPageHandler],
})
export class PageApplicationModule {}
