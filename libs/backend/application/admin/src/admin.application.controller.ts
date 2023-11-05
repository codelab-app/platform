import { AdminRepository } from '@codelab/backend/domain/admin'
import { ExportDto, ImportDto } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SeederApplicationService } from './use-case'
import { ExportAdminDataCommand } from './use-case/export/export-admin-data.command.service'
import { ImportAdminDataService } from './use-case/import/import-admin-data.service'

export class ResetDataDto {
  close?: false
}

@Controller('admin')
export class AdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly adminRepository: AdminRepository,
    private readonly importAdminDataService: ImportAdminDataService,
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
    await this.importAdminDataService.import({ adminDataPath })
    // if (includeUserData) {
    //   const json = fs.readFileSync(file.path, 'utf8')
    //   const userData = JSON.parse(json)
    //   console.log('import user data')
    //   // await importUserData(userData, { auth0Id: selectedAuth0Id });
    // }
  }

  @Post('reset-database')
  async resetDatabase() {
    await this.adminRepository.resetDatabase()

    return {
      message: 'Admin data reset success',
    }
  }

  @Post('reset-database-except-user')
  async resetDatabaseExceptUser() {
    await this.adminRepository.resetDatabaseExceptUser()

    return {
      message: 'Admin data reset success',
    }
  }

  /**
   * We want to keep the default atom
   */
  @Post('reset-database-except-user-and-atom')
  async resetDatabaseExceptUserAndAtom() {
    await this.adminRepository.resetDatabaseExceptUserAndAtom()

    return {
      message: 'Admin data reset success',
    }
  }

  /**
   * For dev we don't clear any data
   */
  @Post('setup-dev')
  async setup() {
    await this.seederApplicationService.seedDevBootstrapData()
  }

  @Post('setup-e2e')
  async setupE2e() {
    await this.seederApplicationService.seedE2eBootstrapData()
  }
}
