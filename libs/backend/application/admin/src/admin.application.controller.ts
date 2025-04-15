import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { WsGateway } from '@codelab/backend-infra-adapter-ws'
import { DatabaseService } from '@codelab/backend-infra-adapter-neo4j-driver'
import { type IExportDto, type IImportDto } from '@codelab/shared-abstract-core'
import { IJobQueueResponse } from '@codelab/shared-abstract-infra'
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
    protected loggerService: PinoLoggerService,
    private readonly socketGateway: WsGateway,
  ) {}

  @Post('export')
  async export(@Body() exportDto: IExportDto & { jobId: string }) {
    const { adminDataPath, download, jobId } = exportDto

    setTimeout(async () => {
      const exportCommand = new ExportAdminDataCommand(adminDataPath)
      const data = await this.commandBus.execute(exportCommand)

      this.socketGateway.emitJobComplete({
        data: download ? data : null,
        jobId,
      })

      return data
    })

    return {
      jobId,
      message: 'Exporting data',
      status: 'queued',
    }
  }

  @Post('import')
  async import(
    @Body() { adminDataPath, jobId }: IImportDto & { jobId: string },
  ): Promise<IJobQueueResponse> {
    setTimeout(async () => {
      await this.commandBus.execute(
        new ImportAdminDataCommand(adminDataPath, { upsert: true }),
      )

      this.socketGateway.emitJobComplete({
        data: { message: 'Data successfully imported' },
        jobId,
      })
    })

    return {
      jobId,
      message: 'Importing data',
      status: 'queued',
    }
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
   * Runs once before all E2e runs
   */
  @Post('setup-e2e-data')
  async setupE2eData() {
    await this.seederApplicationService.setupE2eData()
  }
}
