import {
  ExportAtomsHandler,
  ImportAtomHandler,
} from '@codelab/backend/application/atom'
import {
  ExportComponentsHandler,
  ImportComponentsHandler,
} from '@codelab/backend/application/component'
import { DatabaseService } from '@codelab/backend/application/service'
import { ExportTagsHandler } from '@codelab/backend/application/tag'
import {
  ExportApiHandler,
  ExportSystemTypesHandler,
  ImportApiHandler,
} from '@codelab/backend/application/type'
import { ExportUserDataHandler } from '@codelab/backend/application/user'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { ComponentDomainModule } from '@codelab/backend/domain/component'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { StoreDomainModule } from '@codelab/backend/domain/store'
import { TagDomainModule } from '@codelab/backend/domain/tag'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AdminController } from './admin.controller'
import { MigrationDataService } from './services/migration-data.service'
import { ExportAdminDataHandler } from './use-case/export/export-admin-data.command.service'
import { WriteAdminDataService } from './use-case/export/write-admin-data.service'
import { ImportAdminDataHandler } from './use-case/import/import-admin-data.command.service'
import { ReadAdminDataService } from './use-case/import/read-admin-data.service'

@Module({
  controllers: [AdminController],
  imports: [
    OtelModule,
    CqrsModule,
    UserDomainModule,
    TagDomainModule,
    AtomDomainModule,
    TypeDomainModule,
    ElementDomainModule,
    ComponentDomainModule,
    PropDomainModule,
    StoreDomainModule,
  ],
  providers: [
    DatabaseService,
    ImportAdminDataHandler,
    ImportAtomHandler,
    ImportApiHandler,
    ImportComponentsHandler,
    ExportSystemTypesHandler,
    ExportAdminDataHandler,
    ExportUserDataHandler,
    ExportAtomsHandler,
    ExportTagsHandler,
    ExportComponentsHandler,
    ExportApiHandler,
    MigrationDataService,
    ReadAdminDataService,
    WriteAdminDataService,
  ],
})
export class AdminModule {}
