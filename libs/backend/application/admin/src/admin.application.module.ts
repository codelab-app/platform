import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { ComponentApplicationModule } from '@codelab/backend/application/component'
import { DataModule } from '@codelab/backend/application/data'
import { SharedApplicationModule } from '@codelab/backend/application/shared'
import { StoreApplicationModule } from '@codelab/backend/application/store'
import { TagApplicationModule } from '@codelab/backend/application/tag'
import { TypeApplicationModule } from '@codelab/backend/application/type'
import { UserApplicationModule } from '@codelab/backend/application/user'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { SeederDomainModule } from '@codelab/backend/domain/shared/seeder'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AdminController } from './admin.application.controller'
import { SeederApplicationService } from './use-case'
import { ExportAdminDataHandler } from './use-case/export/export-admin-data.command.service'
import { ImportAdminDataHandler } from './use-case/import/import-admin-data.command.service'

@Module({
  controllers: [AdminController],
  exports: [],
  imports: [
    /**
     * Domain
     */
    SeederDomainModule,
    CqrsModule,
    DataModule,
    SharedDomainModule,
    SharedApplicationModule,
    /**
     * Application
     */
    AtomApplicationModule,
    StoreApplicationModule,
    ComponentApplicationModule,
    TypeApplicationModule,
    UserApplicationModule,
    TagApplicationModule,
  ],
  providers: [
    SeederApplicationService,
    ImportAdminDataHandler,
    ExportAdminDataHandler,
  ],
})
export class AdminApplicationModule {}
