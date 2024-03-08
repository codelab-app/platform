import {
  ElementApplicationModule,
  ElementApplicationService,
} from '@codelab/backend/application/element'
import { StoreApplicationModule } from '@codelab/backend/application/store'
import { TypeApplicationModule } from '@codelab/backend/application/type'
import { ComponentDomainModule } from '@codelab/backend/domain/component'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ComponentApplicationController } from './component.application.controller'
import { ComponentApplicationService } from './service/component.application.service'
import { ExportComponentHandler, ImportComponentsHandler } from './use-case'

@Module({
  controllers: [ComponentApplicationController],
  exports: [ComponentApplicationService],
  imports: [
    CqrsModule,
    ComponentDomainModule,
    StoreApplicationModule,
    TypeDomainModule,
    ElementDomainModule,
    ElementApplicationModule,
    TypeApplicationModule,
    PropDomainModule,
    OtelModule,
    AuthDomainModule,
  ],
  providers: [
    ExportComponentHandler,
    ImportComponentsHandler,
    ComponentApplicationService,
  ],
})
export class ComponentApplicationModule {}
