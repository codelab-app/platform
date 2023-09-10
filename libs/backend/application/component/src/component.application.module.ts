import { StoreApplicationModule } from '@codelab/backend/application/store'
import { TypeApplicationModule } from '@codelab/backend/application/type'
import { ComponentDomainModule } from '@codelab/backend/domain/component'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ComponentApplicationService } from './service/component.application.service'
import { ExportComponentHandler, ImportComponentsHandler } from './use-case'

@Module({
  exports: [
    ExportComponentHandler,
    ImportComponentsHandler,
    ComponentApplicationService,
  ],
  imports: [
    CqrsModule,
    ComponentDomainModule,
    StoreApplicationModule,
    TypeDomainModule,
    ElementDomainModule,
    TypeApplicationModule,
    PropDomainModule,
  ],
  providers: [
    ExportComponentHandler,
    ImportComponentsHandler,
    ComponentApplicationService,
  ],
})
export class ComponentApplicationModule {}
