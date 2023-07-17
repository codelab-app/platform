import { ImportAdminDataService } from '@codelab/backend/application/admin'
import {
  ExportService,
  ImportService,
  ResetService,
  ScrapeAntdService,
  ScrapeHtmlService,
  SeedService,
  ServerlessService,
  TaskService,
  TerraformService,
} from '@codelab/backend/infra/adapter/cli'
import { neo4jConfig } from '@codelab/backend/infra/adapter/neo4j'
import { CLI_TRACER } from '@codelab/shared/infra/otel'
import { BullModule } from '@nestjs/bull'
import type { OnModuleInit } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { trace } from '@opentelemetry/api'
import path from 'path'
import { CommandService } from './command.service'

@Module({
  exports: [CommandService],
  imports: [
    BullModule.registerQueue({
      name: 'import-admin-data',
    }),
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [neo4jConfig],
    }),
  ],
  providers: [
    {
      provide: 'DATA_PATH',
      useValue: path.resolve('./data/export'),
    },
    CommandService,
    ImportService,
    SeedService,
    ExportService,
    ImportAdminDataService,
    ScrapeAntdService,
    ScrapeHtmlService,
    TerraformService,
    ServerlessService,
    TaskService,
    ResetService,
  ],
})
export class CommandModule implements OnModuleInit {
  constructor(private readonly commandService: CommandService) {}

  onModuleInit() {
    this.commandService.exec()
  }
  // https://github.com/codelab-app/platform/blob/2b929d723822dbf9654526deb29dfcef2b7af0e9/libs/backend/infra/adapter/cli/src/commands/import/import.service.ts#L38
}
