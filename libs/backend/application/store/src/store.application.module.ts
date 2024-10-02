import { ActionDomainModule } from '@codelab/backend/domain/action'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { ResourceDomainModule } from '@codelab/backend/domain/resource'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { StoreDomainModule } from '@codelab/backend/domain/store'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { StoreApplicationService } from './store.application.service'
import {
  ExportStoreCommand,
  ExportStoreHandler,
  ImportStoreCommand,
  ImportStoreHandler,
} from './use-case'

@Module({
  exports: [StoreApplicationService],
  imports: [
    CqrsModule,
    ActionDomainModule,
    StoreDomainModule,
    ResourceDomainModule,
    PropDomainModule,
    SharedDomainModule,
    TypeDomainModule,
  ],
  providers: [
    StoreApplicationService,
    ExportStoreCommand,
    ExportStoreHandler,
    ImportStoreHandler,
    ImportStoreCommand,
  ],
})
export class StoreApplicationModule {}
