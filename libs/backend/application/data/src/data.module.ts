import { Module } from '@nestjs/common'
import {
  MigrationDataService,
  ReadAdminDataService,
  WriteAdminDataService,
} from './service'

@Module({
  exports: [ReadAdminDataService, WriteAdminDataService, MigrationDataService],
  imports: [],
  providers: [
    ReadAdminDataService,
    WriteAdminDataService,
    MigrationDataService,
  ],
})
export class DataModule {}
