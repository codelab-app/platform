import {
  CurrentUser,
  DatabaseService,
} from '@codelab/backend/application/service'
import { ExportDto, IUserDTO } from '@codelab/shared/abstract/core'
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
    private readonly databaseService: DatabaseService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('export')
  async export(@Body() exportDto: ExportDto, @CurrentUser() user: IUserDTO) {
    const { adminDataPath } = exportDto

    await this.commandBus.execute(new ExportAdminDataCommand(adminDataPath))

    // if (includeUserData) {
    //   const userData = await this.commandBus.execute(
    //     new ExportUserDataCommand(user),
    //   )

    //   await saveFormattedFile(`${user.auth0Id}-${Date.now()}.json`, userData)
    // }
  }

  @Post('reset')
  async reset(@Body() resetDataDto: ResetDataDto) {
    await this.databaseService.reset(resetDataDto.close)

    return {
      message: 'Admin data reset success',
    }
  }

  @Post('import')
  async import(
    // @Body() { includeAdminData, includeUserData }: ImportDto,
    @CurrentUser() user: IUserDTO,
  ) {
    await this.commandBus.execute(new ImportAdminDataCommand(user))
    // if (includeUserData) {
    //   const json = fs.readFileSync(file.path, 'utf8')
    //   const userData = JSON.parse(json)
    //   console.log('import user data')
    //   // await importUserData(userData, { auth0Id: selectedAuth0Id });
    // }
  }
}
