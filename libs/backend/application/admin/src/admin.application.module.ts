import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { ComponentApplicationModule } from '@codelab/backend/application/component'
import { SharedApplicationModule } from '@codelab/backend/application/shared'
import { StoreApplicationModule } from '@codelab/backend/application/store'
import { TypeApplicationModule } from '@codelab/backend/application/type'
import { UserApplicationModule } from '@codelab/backend/application/user'
import { AdminDomainModule } from '@codelab/backend/domain/admin'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { SeederDomainModule } from '@codelab/backend/domain/shared/seeder'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AdminController } from './admin.application.controller'
import { SeederApplicationService } from './use-case'
import { ExportAdminDataHandler } from './use-case/export/export-admin-data.command.service'
import {
  BullQueueModule,
  BullRootModule,
  QueueService,
} from './use-case/import/bull-queue.module'
import { ImportAdminDataService } from './use-case/import/import-admin-data.service'

@Module({
  controllers: [AdminController],
  imports: [
    /**
     * Domain
     */
    SeederDomainModule,
    CqrsModule,
    SharedDomainModule,
    SharedApplicationModule,
    AdminDomainModule,
    /**
     * Application
     */
    AtomApplicationModule,
    StoreApplicationModule,
    ComponentApplicationModule,
    TypeApplicationModule,
    UserApplicationModule,
    BullRootModule,
    BullQueueModule,
  ],
  providers: [
    SeederApplicationService,
    ImportAdminDataService,
    ExportAdminDataHandler,
    QueueService,
  ],
})
export class AdminApplicationModule {}
