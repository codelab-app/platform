import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { Module } from '@nestjs/common'

import {
  ImportDataMapperService,
  MigrationDataService,
  ReadAdminDataService,
  WriteAdminDataService,
} from './service'

@Module({
  exports: [
    ReadAdminDataService,
    WriteAdminDataService,
    MigrationDataService,
    ImportDataMapperService,
  ],
  providers: [
    AuthDomainService,
    ReadAdminDataService,
    WriteAdminDataService,
    MigrationDataService,
    ImportDataMapperService,
  ],
})
export class DataModule {}
