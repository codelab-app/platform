import {
  ScrapeAntdService,
  ScrapeHtmlService,
  SeedService,
  TaskService,
  TerraformService,
} from '@codelab/backend/infra/adapter/cli'
import { neo4jConfig, OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import type { OnModuleInit } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommandService } from './command.service'

@Module({
  exports: [CommandService],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [neo4jConfig],
    }),
    OGMModule,
  ],
  providers: [
    CommandService,
    SeedService,
    ScrapeAntdService,
    ScrapeHtmlService,
    TerraformService,
    TaskService,
  ],
})
export class CommandModule implements OnModuleInit {
  constructor(private readonly commandService: CommandService) {}

  onModuleInit() {
    this.commandService.exec()
  }
  // https://github.com/codelab-app/platform/blob/2b929d723822dbf9654526deb29dfcef2b7af0e9/libs/backend/infra/adapter/cli/src/commands/import/import.service.ts#L38
}
