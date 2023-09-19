import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import {
  ExportApiHandler,
  ExportSystemTypesHandler,
  ImportApiHandler,
} from './use-case'
import { ImportSystemTypesHandler } from './use-case/import/import-system-types.command.service'

@Module({
  exports: [
    ImportApiHandler,
    ExportApiHandler,
    ExportSystemTypesHandler,
    ImportSystemTypesHandler,
  ],
  imports: [CqrsModule, TypeDomainModule],
  providers: [
    ImportApiHandler,
    ExportApiHandler,
    ExportSystemTypesHandler,
    ImportSystemTypesHandler,
  ],
})
export class TypeApplicationModule {}
