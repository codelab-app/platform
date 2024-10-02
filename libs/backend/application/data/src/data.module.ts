import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'

import {
  MigrationDataService,
  ReadAdminDataService,
  WriteAdminDataService,
} from './service'

@Module({
  exports: [ReadAdminDataService, WriteAdminDataService, MigrationDataService],
  imports: [ValidationModule],
  providers: [
    ReadAdminDataService,
    WriteAdminDataService,
    MigrationDataService,
  ],
})
export class DataModule {}
