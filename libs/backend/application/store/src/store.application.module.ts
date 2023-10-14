import {
  ActionFactory,
  ApiActionRepository,
  CodeActionRepository,
} from '@codelab/backend/domain/action'
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
  exports: [
    ExportStoreCommand,
    ExportStoreHandler,
    ImportStoreHandler,
    ImportStoreCommand,
  ],
  imports: [CqrsModule, StoreDomainModule, SharedDomainModule],
  providers: [
    ActionFactory,
    ApiActionRepository,
    CodeActionRepository,
    ExportStoreCommand,
    ExportStoreHandler,
    ImportStoreHandler,
    ImportStoreCommand,
  ],
})
export class StoreApplicationModule {}
