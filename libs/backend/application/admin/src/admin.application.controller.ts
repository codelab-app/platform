import { SeederDomainService } from '@codelab/backend/domain/shared/seeder'
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
    private seederDomainService: SeederDomainService,
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
