import { DataModule } from '@codelab/backend/application/data'
import { SharedApplicationModule } from '@codelab/backend/application/shared'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { TypeApplicationService, TypeSeederService } from './service'
import { TypeApplicationController } from './type.application.controller'
import { SeedCypressTypesHandler, SeedSystemTypesHandler } from './use-case'
import { ExportApiHandler } from './use-case/api/export-api.command.service'
import { ImportApiHandler } from './use-case/api/import-api/import-api.command.service'
import { ExportSystemTypesHandler } from './use-case/system-types/export-system-types.command.service'
import { ImportSystemTypesHandler } from './use-case/system-types/import-system-types.command.service'

@Module({
  controllers: [TypeApplicationController],
  exports: [TypeApplicationService],
  imports: [
    DataModule,
    CqrsModule,
    TypeDomainModule,
    AuthDomainModule,
    SharedApplicationModule,
  ],
  providers: [
    SeedCypressTypesHandler,
    TypeApplicationService,
    ImportApiHandler,
    ExportApiHandler,
    ExportSystemTypesHandler,
    ImportSystemTypesHandler,
    TypeSeederService,
    SeedSystemTypesHandler,
  ],
})
export class TypeApplicationModule {}
