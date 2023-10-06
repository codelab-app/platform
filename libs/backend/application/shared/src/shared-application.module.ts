import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import {
  MigrationDataService,
  ReadAdminDataService,
  WriteAdminDataService,
} from './data'

@Module({
  exports: [ReadAdminDataService, WriteAdminDataService, MigrationDataService],
  imports: [ValidationModule, OtelModule],
  providers: [
    ReadAdminDataService,
    WriteAdminDataService,
    MigrationDataService,
  ],
})
export class SharedApplicationModule {}
