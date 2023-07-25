import { CurrentUser } from '@codelab/backend/application/service'
import { ExportUserDataCommand } from '@codelab/backend/application/user'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import { IAuth0User } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ExportAdminDataCommand } from './export-admin-data.command.service'

class ExportDto {
  includeUserData?: boolean

  includeAdminData?: boolean

  userDataPath?: string

  adminDataPath?: string
}

@Controller('export')
export class ExportController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async export(@Body() exportDto: ExportDto, @CurrentUser() user: IAuth0User) {
    const { includeAdminData, includeUserData } = exportDto

    if (includeAdminData) {
      await this.commandBus.execute(new ExportAdminDataCommand())
    }

    if (includeUserData) {
      const userData = await this.commandBus.execute(
        new ExportUserDataCommand(user),
      )

      await saveFormattedFile(`${user.auth0Id}-${Date.now()}.json`, userData)
    }
  }
}
