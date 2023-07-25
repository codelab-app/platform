import 'multer'
import { ImportAdminDataCommand } from '@codelab/backend/application/admin'
import { UserRepository } from '@codelab/backend/domain/user'
import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import fs from 'fs'

@Controller('import')
export class ImportController {
  constructor(
    private readonly importAdminDataService: ImportAdminDataCommand,
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async importData(
    @UploadedFile() file: Express.Multer.File,
    @Query('email') email: string,
    @Query('includeAdminData') includeAdminData: boolean,
    @Query('includeUserData') includeUserData: boolean,
  ) {
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

    if (includeUserData) {
      const json = fs.readFileSync(file.path, 'utf8')
      const userData = JSON.parse(json)
      console.log('import user data')
      // await importUserData(userData, { auth0Id: selectedAuth0Id });
    }
  }
}
