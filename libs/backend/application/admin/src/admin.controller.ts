import { AuthService } from '@codelab/backend/application/shared'
import { AdminRepository } from '@codelab/backend/domain/admin'
import { ExportDto, ImportDto } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ExportAdminDataCommand } from './use-case/export/export-admin-data.command.service'
import { ImportAdminDataCommand } from './use-case/import/import-admin-data.command.service'

export class ResetDataDto {
  close?: false
}

@Controller('admin')
export class AdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly adminRepository: AdminRepository,
    private authService: AuthService,
  ) {}

  /**
   * We want to keep the default atom
   */
  @Post('reset-database-except-user-and-atom')
  async cypressReset() {
    await this.adminRepository.resetDatabaseExceptUserAndAtom()

    return {
      message: 'Admin data reset success',
    }
  }

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
}