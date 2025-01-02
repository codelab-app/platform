import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { ValidationModule } from '@codelab/backend/infra/adapter/validation'
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
    AuthDomainService,
    ReadAdminDataService,
    WriteAdminDataService,
    MigrationDataService,
  ],
})
export class DataModule {}
