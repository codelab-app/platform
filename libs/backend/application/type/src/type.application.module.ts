import { DataModule } from '@codelab/backend/application/data'
import { SharedApplicationModule } from '@codelab/backend/application/shared'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeApplicationService } from './service'
import { TypeApplicationController } from './type.application.controller'
import { SeedCypressTypesHandler } from './use-case'
import { ExportApiHandler } from './use-case/api/export-api.command.service'
import { ImportApiHandler } from './use-case/api/import-api/import-api.command.service'
import { ExportSystemTypesHandler } from './use-case/system-types/export-system-types.command.service'
import { ImportSystemTypesHandler } from './use-case/system-types/import-system-types.command.service'

@Module({
  controllers: [TypeApplicationController],
  exports: [
    SeedCypressTypesHandler,
    TypeApplicationService,
    ImportApiHandler,
    ExportApiHandler,
    ExportSystemTypesHandler,
    ImportSystemTypesHandler,
  ],
  imports: [DataModule, CqrsModule, TypeDomainModule, SharedApplicationModule],
  providers: [
    SeedCypressTypesHandler,
    TypeApplicationService,
    ImportApiHandler,
    ExportApiHandler,
    ExportSystemTypesHandler,
    ImportSystemTypesHandler,
  ],
})
export class TypeApplicationModule {}
