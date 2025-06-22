import { DataModule } from '@codelab/backend-application-data'
import { AuthDomainModule } from '@codelab/backend-domain-shared-auth'
import { TypeDomainModule } from '@codelab/backend-domain-type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { TypeApplicationService, TypeSeederService } from './service'
import { TypeApplicationController } from './type.application.controller'
import { SeedE2eTypesHandler, SeedSystemTypesHandler } from './use-case'
import { ExportApiHandler } from './use-case/api/export-api.command.service'
import { ExportSystemTypesHandler } from './use-case/system-types/export-system-types.command.service'
import { ImportSystemTypesHandler } from './use-case/system-types/import-system-types.command.service'

@Module({
  controllers: [TypeApplicationController],
  exports: [TypeApplicationService],
  imports: [DataModule, CqrsModule, TypeDomainModule, AuthDomainModule],
  providers: [
    SeedE2eTypesHandler,
    TypeApplicationService,
    ExportApiHandler,
    ExportSystemTypesHandler,
    ImportSystemTypesHandler,
    TypeSeederService,
    SeedSystemTypesHandler,
  ],
})
export class TypeApplicationModule {}
