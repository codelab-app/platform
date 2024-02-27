import { DatabaseService } from '@codelab/backend/infra/adapter/neo4j'
import { ExportDto, ImportDto } from '@codelab/shared/abstract/core'
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
  ) {}

  @Post('export')
  async export(@Body() exportDto: ExportDto) {
    const { adminDataPath } = exportDto

    await this.commandBus.execute(new ExportAdminDataCommand(adminDataPath))

    // if (includeUserData) {
    //   const userData = await this.commandBus.execute(
    //     new ExportUserDataCommand(user),
    //   )

    //   await saveFormattedFile(`${user.auth0Id}-${Date.now()}.json`, userData)
    // }
  }

  @Post('import')
  async import(@Body() { adminDataPath }: ImportDto) {
    await this.commandBus.execute(new ImportAdminDataCommand(adminDataPath))
    // if (includeUserData) {
    //   const json = fs.readFileSync(file.path, 'utf8')
    //   const userData = JSON.parse(json)
    //   console.log('import user data')
    //   // await importUserData(userData, { auth0Id: selectedAuth0Id });
    // }
  }

  @Post('reset-cypress-user-data')
  async resetCypressUserData() {
    await this.databaseService.resetUserData()
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
   * Runs once before all Cypress runs
   */
  @Post('seed-cypress-system-data')
  async seedCypressSystemData() {
    await this.seederApplicationService.seedE2eSystemData()
  }

  /**
   * For dev we don't clear any data
   */
  @Post('setup-dev')
  async setup() {
    await this.seederApplicationService.seedDevBootstrapData()
  }
}
