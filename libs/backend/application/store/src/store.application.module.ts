import { StoreDomainModule } from '@codelab/backend/domain/store'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportStoreCommand, ExportStoreHandler } from './use-case'

@Module({
  exports: [ExportStoreCommand, ExportStoreHandler],
  imports: [CqrsModule, StoreDomainModule],
  providers: [ExportStoreCommand, ExportStoreHandler],
})
export class StoreApplicationModule {}
