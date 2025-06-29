import { AuthDomainService } from '@codelab/backend-domain-shared-auth'
import { Module } from '@nestjs/common'

import {
  MigrationDataService,
  ReadAdminDataService,
  WriteAdminDataService,
} from './service'

@Module({
  exports: [ReadAdminDataService, WriteAdminDataService, MigrationDataService],
  providers: [
    AuthDomainService,
    ReadAdminDataService,
    WriteAdminDataService,
    MigrationDataService,
  ],
})
export class DataModule {}
