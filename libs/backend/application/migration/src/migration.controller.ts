import 'multer'
import { CurrentUser } from '@codelab/backend/application/service'
import { ExportUserDataCommand } from '@codelab/backend/application/user'
import { UserRepository } from '@codelab/backend/domain/user'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import { type IUserDTO } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ExportAdminDataCommand } from './export/export-admin-data.command.service'
import { ImportAdminDataCommand } from './import/import-admin-data.command.service'

class ExportDto {
  includeUserData?: boolean

  includeAdminData?: boolean

  userDataPath?: string

  adminDataPath?: string

  download?: boolean
}

@Controller('migration')
export class MigrationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('import')
  async import(
    @Body() { includeAdminData, includeUserData }: ExportDto,
    @CurrentUser() user: IUserDTO,
  ) {
    const email = user.email

    const selectedAuth0Id = (
      await this.userRepository.find({ where: { email } })
    )[0]?.auth0Id

    if (!selectedAuth0Id) {
      throw new Error(`Cannot find user with email ${email}`)
    }

    if (includeAdminData) {
      await this.commandBus.execute(
        new ImportAdminDataCommand({ auth0Id: selectedAuth0Id }),
      )
    }
    // if (includeUserData) {
    //   const json = fs.readFileSync(file.path, 'utf8')
    //   const userData = JSON.parse(json)
    //   console.log('import user data')
    //   // await importUserData(userData, { auth0Id: selectedAuth0Id });
    // }
  }

  @Post('export')
  async export(@Body() exportDto: ExportDto, @CurrentUser() user: IUserDTO) {
    const { adminDataPath, includeAdminData, includeUserData } = exportDto

    if (includeAdminData) {
      await this.commandBus.execute(new ExportAdminDataCommand(adminDataPath))
    }

    if (includeUserData) {
      const userData = await this.commandBus.execute(
        new ExportUserDataCommand(user),
      )

      await saveFormattedFile(`${user.auth0Id}-${Date.now()}.json`, userData)
    }
  }
}
