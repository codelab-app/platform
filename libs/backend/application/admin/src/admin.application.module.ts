import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { ComponentApplicationModule } from '@codelab/backend/application/component'
import { SharedApplicationModule } from '@codelab/backend/application/shared'
import { StoreApplicationModule } from '@codelab/backend/application/store'
import { TagApplicationModule } from '@codelab/backend/application/tag'
import { TypeApplicationModule } from '@codelab/backend/application/type'
import { UserApplicationModule } from '@codelab/backend/application/user'
import { AdminDomainModule } from '@codelab/backend/domain/admin'
import { AuthDomainModule } from '@codelab/backend/domain/shared'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AdminController } from './admin.application.controller'
import { ExportAdminDataHandler } from './use-case/export/export-admin-data.command.service'
import { ImportAdminDataHandler } from './use-case/import/import-admin-data.command.service'

@Module({
  controllers: [AdminController],
  imports: [
    CqrsModule,
    SharedApplicationModule,
    ValidationModule,
    AuthDomainModule,
    /**
     * Application
     */
    AdminDomainModule,
    AtomApplicationModule,
    StoreApplicationModule,
    TagApplicationModule,
    ComponentApplicationModule,
    TypeApplicationModule,
    UserApplicationModule,
  ],
  providers: [ImportAdminDataHandler, ExportAdminDataHandler],
})
export class AdminApplicationModule {}
