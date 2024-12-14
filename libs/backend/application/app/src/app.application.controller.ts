import type { IApp, IAppAggregateExport } from '@codelab/shared/abstract/core'

import { ImportCypressAtomsCommand } from '@codelab/backend/application/atom'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import { DatabaseService } from '@codelab/backend/infra/adapter/neo4j'
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
import { Express, Request as ExpressRequest } from 'express'
import 'multer'

import {
  ExportAppCommand,
  ImportAppCommand,
  SeedCypressAppCommand,
} from './use-case'

@Controller('app')
export class AppApplicationController {
  constructor(
    private commandBus: CommandBus,
    private databaseService: DatabaseService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('export')
  async exportApp(@Request() req: ExpressRequest) {
    return this.commandBus.execute<SeedCypressAppCommand, IAppAggregateExport>(
      new ExportAppCommand({ id: req.query['id'] as string }),
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-cypress-app')
  async seedApp() {
    await this.databaseService.resetUserData()

    console.log('Seeding system types:')

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    console.log('Seeding atoms:')

    await this.commandBus.execute<ImportCypressAtomsCommand>(
      new ImportCypressAtomsCommand(),
    )

    console.log('Seeding app:')

    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new SeedCypressAppCommand(),
    )
  }
}
