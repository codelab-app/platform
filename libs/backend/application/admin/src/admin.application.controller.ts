import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { DatabaseService } from '@codelab/backend/infra/adapter/neo4j'
import { type IExportDto, type IImportDto } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SeederApplicationService } from './use-case'
import { ExportAdminDataCommand } from './use-case/export/export-admin-data.command.service'
import { ImportAdminDataCommand } from './use-case/import/import-admin-data.command.service'

export class ResetDataDto {
  close?: false
}

@Controller('admin')
export class AdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly databaseService: DatabaseService,
    private seederApplicationService: SeederApplicationService,
    protected loggerService: CodelabLoggerService,
  ) {}

  @Post('export')
  async export(@Body() exportDto: IExportDto) {
    const { adminDataPath, download } = exportDto
    const exportCommand = new ExportAdminDataCommand(adminDataPath)
    const data = await this.commandBus.execute(exportCommand)

    return download ? data : null
  }

  @Post('import')
  async import(@Body() { adminDataPath }: IImportDto) {
    await this.commandBus.execute(new ImportAdminDataCommand(adminDataPath))
  }

  @Post('reset-and-seed-user')
  async resetAndSeedUser() {
    await this.seederApplicationService.resetAndSeedUser()
  }

  @Post('reset-database')
  async resetDatabase() {
    await this.databaseService.resetDatabase()

    return {
      message: 'Admin data reset success',
    }
  }

  @Post('reset-database-except-user')
  async resetDatabaseExceptUser() {
    await this.databaseService.resetDatabaseExceptUser()

    return {
      message: 'Admin data reset success',
    }
  }

  /**
   * For dev we don't clear any data
   */
  @Post('setup-dev')
  async setup() {
    await this.seederApplicationService.setupDevBootstrapData()
  }

  /**
   * Runs once before all Cypress runs
   */
  @Post('setup-e2e-data')
  async setupE2eData() {
    await this.seederApplicationService.setupE2eData()
  }
}
