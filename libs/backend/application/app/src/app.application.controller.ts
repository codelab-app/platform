import type { IApp, IAppAggregateExport } from '@codelab/shared/abstract/core'

import { ImportCypressAtomsCommand } from '@codelab/backend/application/atom'
import { ImportDataMapperService } from '@codelab/backend/application/data'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express, Request as ExpressRequest, Response } from 'express'
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
    private logger: PinoLoggerService,
    private importDataMapperService: ImportDataMapperService,
  ) {}

  /**
   * Fixes
   *
   * APIResponse: 500 Internal Server Error
   * Date: Fri, 28 Feb 2025 09:56:11 GMT
   * Connection: keep-alive
   * Keep-Alive: timeout=5
   * Transfer-Encoding: chunked
   */
  @Post('demo')
  async demo(@Res() response: Response) {
    this.logger.debug('Demo start')

    // Send headers right away to establish connection
    response.writeHead(200, {
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      'Transfer-Encoding': 'chunked',
    })

    // Send progress updates every 5 seconds to keep connection alive
    const interval = setInterval(() => {
      response.write('{"progress":"processing"}\n')
    }, 5000)

    await new Promise((resolve) => {
      setTimeout(() => {
        clearInterval(interval)
        this.logger.debug('Demo complete')
        response.write('{"status":"complete"}\n')
        response.end('{}')
        resolve({})
      }, 35000)
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('export')
  async exportApp(@Request() req: ExpressRequest) {
    return this.commandBus.execute<ExportAppCommand, IAppAggregateExport>(
      new ExportAppCommand({ id: req.query['id'] as string }),
    )
  }

  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('file'))
  @Post('import')
  async importApp(@UploadedFile() file: Express.Multer.File) {
    const json = file.buffer.toString('utf8')
    const data = JSON.parse(json)
    const importData = this.importDataMapperService.getAppImportData(data)

    return this.commandBus.execute<ImportAppCommand, IApp>(
      new ImportAppCommand(importData),
    )
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-cypress-app')
  async seedApp() {
    await this.databaseService.resetUserData()

    this.logger.log('Seeding system types', {
      context: 'AppApplicationController',
    })

    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    this.logger.log('Seeding atoms', { context: 'AppApplicationController' })

    await this.commandBus.execute<ImportCypressAtomsCommand>(
      new ImportCypressAtomsCommand(),
    )

    this.logger.log('Seeding app', { context: 'AppApplicationController' })

    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new SeedCypressAppCommand(),
    )
  }
}
