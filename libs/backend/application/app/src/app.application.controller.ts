import 'multer'
import { ImportCypressAtomsCommand } from '@codelab/backend/application/atom'
import {
  ImportSystemTypesCommand,
  SeedSystemTypesCommand,
} from '@codelab/backend/application/type'
import { DatabaseService } from '@codelab/backend/infra/adapter/neo4j'
import type { IApp, IAppAggregate } from '@codelab/shared/abstract/core'
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
    return this.commandBus.execute<SeedCypressAppCommand, IAppAggregate>(
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-cypress-app')
  async seedApp() {
    await this.databaseService.resetUserData()

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    await this.commandBus.execute<ImportCypressAtomsCommand>(
      new ImportCypressAtomsCommand(),
    )

    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new SeedCypressAppCommand(),
    )
  }
}
