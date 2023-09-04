import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportStoreCommand } from './use-case'

@Module({
  exports: [ExportStoreCommand],
  imports: [CqrsModule],
  providers: [ExportStoreCommand],
})
export class StoreApplicationModule {}
