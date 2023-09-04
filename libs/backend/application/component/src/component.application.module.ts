import { TypeApplicationModule } from '@codelab/backend/application/type'
import { ComponentDomainModule } from '@codelab/backend/domain/component'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportComponentsHandler, ImportComponentsHandler } from './use-case'

@Module({
  exports: [ExportComponentsHandler, ImportComponentsHandler],
  imports: [
    CqrsModule,
    ComponentDomainModule,
    TypeDomainModule,
    ElementDomainModule,
    TypeApplicationModule,
    PropDomainModule,
  ],
  providers: [ExportComponentsHandler, ImportComponentsHandler],
})
export class ComponentApplicationModule {}
