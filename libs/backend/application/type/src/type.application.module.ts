import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeApplicationController } from './type.application.controller'
import {
  ExportApiHandler,
  ExportSystemTypesHandler,
  ImportApiHandler,
  SeedCypressTypesHandler,
} from './use-case'
import { ImportSystemTypesHandler } from './use-case/import/import-system-types.command.service'

@Module({
  controllers: [TypeApplicationController],
  exports: [
    SeedCypressTypesHandler,
    ImportApiHandler,
    ExportApiHandler,
    ExportSystemTypesHandler,
    ImportSystemTypesHandler,
  ],
  imports: [CqrsModule, TypeDomainModule],
  providers: [
    SeedCypressTypesHandler,
    ImportApiHandler,
    ExportApiHandler,
    ExportSystemTypesHandler,
    ImportSystemTypesHandler,
  ],
})
export class TypeApplicationModule {}
