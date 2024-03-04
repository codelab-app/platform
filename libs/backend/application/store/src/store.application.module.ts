import {
  ActionDomainModule,
  ActionFactory,
  ApiActionRepository,
  CodeActionRepository,
} from '@codelab/backend/domain/action'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { ResourceDomainModule } from '@codelab/backend/domain/resource'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { StoreDomainModule } from '@codelab/backend/domain/store'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import {
  ExportStoreCommand,
  ExportStoreHandler,
  ImportStoreCommand,
  ImportStoreHandler,
} from './use-case'

@Module({
  exports: [],
  imports: [
    CqrsModule,
    ActionDomainModule,
    StoreDomainModule,
    ResourceDomainModule,
    PropDomainModule,
    SharedDomainModule,
  ],
  providers: [
    ExportStoreCommand,
    ExportStoreHandler,
    ImportStoreHandler,
    ImportStoreCommand,
  ],
})
export class StoreApplicationModule {}
