import { UserModule } from '@codelab/backend/application/user'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { ComponentDomainModule } from '@codelab/backend/domain/component'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { TagDomainModule } from '@codelab/backend/domain/tag'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import {
  ImportAdminDataCommand,
  ImportAdminDataHandler,
} from './import/import-admin-data.command.service'
import { MigrationController } from './migration.controller'
import { MigrationDataService } from './migration-data.service'

@Module({
  controllers: [MigrationController],
  imports: [
    CqrsModule,
    UserDomainModule,
    TagDomainModule,
    AtomDomainModule,
    TypeDomainModule,
    ElementDomainModule,
    ComponentDomainModule,
  ],
  providers: [
    ImportAdminDataCommand,
    ImportAdminDataHandler,
    MigrationDataService,
  ],
})
export class MigrationModule {}
