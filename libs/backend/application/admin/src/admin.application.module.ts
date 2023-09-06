import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { ComponentApplicationModule } from '@codelab/backend/application/component'
import { DatabaseService } from '@codelab/backend/application/service'
import { StoreApplicationModule } from '@codelab/backend/application/store'
import { TagApplicationModule } from '@codelab/backend/application/tag'
import { TypeApplicationModule } from '@codelab/backend/application/type'
import { UserApplicationModule } from '@codelab/backend/application/user'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
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
    ValidationModule,
    /**
     * Application
     */
    AtomApplicationModule,
    StoreApplicationModule,
    TagApplicationModule,
    ComponentApplicationModule,
    TypeApplicationModule,
    UserApplicationModule,
  ],
  providers: [
    DatabaseService,
    ImportAdminDataHandler,
    ExportAdminDataHandler,
    MigrationDataService,
    ReadAdminDataService,
    WriteAdminDataService,
  ],
})
export class AdminApplicationModule {}
