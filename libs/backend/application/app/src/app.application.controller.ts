import type { IApp, IAppExport } from '@codelab/shared/abstract/core'
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request as ExpressRequest } from 'express'
import {
  ExportAppCommand,
  ImportAppCommand,
  SeedCypressAppCommand,
} from './use-case'

@Controller('data/app')
export class AppApplicationController {
  constructor(private commandBus: CommandBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-cypress-app')
  async seedApp() {
    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new SeedCypressAppCommand(),
    )
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('export')
  async exportApp(@Request() req: ExpressRequest) {
    return this.commandBus.execute<SeedCypressAppCommand, IAppExport>(
      new ExportAppCommand({ id: req.query.id as string }),
    )
  }

  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('file'))
  @Post('import')
  async importApp(@UploadedFile() file: Express.Multer.File) {
    const json = file.buffer.toString('utf8')
    const data = JSON.parse(json)

    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new ImportAppCommand(data),
    )
  }
}
