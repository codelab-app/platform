import { UserModule } from '@codelab/backend/application/user'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ImportController } from './import/import.controller'
import { ImportAdminDataCommand } from './import/import-admin-data.command.service'

@Module({
  controllers: [ImportController],
  imports: [CqrsModule, UserDomainModule],
  providers: [ImportAdminDataCommand],
})
export class MigrationModule {}
