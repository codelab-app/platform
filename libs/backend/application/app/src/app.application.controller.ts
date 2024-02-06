import type { IApp } from '@codelab/shared/abstract/core'
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
  ExportAppsCommand,
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
    console.log('running exportApp')

    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new ExportAppsCommand({ id: req.query.id as string }),
    )
  }

  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('file'))
  @Post('import')
  async importApp(@UploadedFile() file: any) {
    const json = file.buffer.toString('utf8')

    const parsedJson = JSON.parse(json)

    const data = {
      app: parsedJson,
      components: parsedJson.components ?? [],
      pages: parsedJson.pages ?? [],
    }

    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new ImportAppCommand(data, { owner: parsedJson.owner }),
    )
  }
}
