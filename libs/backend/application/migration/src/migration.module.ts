import { Module } from '@nestjs/common'
import { ImportController } from './import/import.controller'
import { ImportAdminDataCommand } from './import/import-admin-data.command.service'

@Module({
  controllers: [ImportController],
  imports: [],
  providers: [ImportAdminDataCommand],
})
export class MigrationModule {}
