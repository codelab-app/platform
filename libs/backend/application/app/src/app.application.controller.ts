import type {
  IApp,
  IAppAggregateExport,
  IAtomType,
  IComponentType,
} from '@codelab/shared/abstract/core'

import { ImportE2eAtomsCommand } from '@codelab/backend/application/atom'
import { ImportComponentsCommand } from '@codelab/backend/application/component'
import { ImportDataMapperService } from '@codelab/backend/application/data'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { DEMO_JOB, SEED_QUEUE } from '@codelab/backend/infra/adapter/queue'
import { WsGateway } from '@codelab/backend/infra/adapter/ws'
import { DatabaseService } from '@codelab/backend-infra-adapter/neo4j-driver'
import { IJobOutput, IJobQueueResponse } from '@codelab/shared/abstract/infra'
import {
  Body,
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
  SeedE2eAppCommand,
} from './use-case'

@Controller('app')
export class AppApplicationController {
  constructor(
    private commandBus: CommandBus,
    private logger: PinoLoggerService,
    private importDataMapperService: ImportDataMapperService,
    private readonly socketGateway: WsGateway,
  ) {}

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

  /**
   * Only seed required atom types for the spec to speed up the test
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-e2e-app')
  async seedApp(
    @Body()
    {
      atomTypes,
      componentTypes,
      jobId,
    }: {
      jobId: string
      atomTypes?: Array<IAtomType>
      componentTypes?: Array<IComponentType>
    },
  ): Promise<IJobQueueResponse> {
    setTimeout(async () => {
      const app = await this.commandBus.execute<SeedE2eAppCommand, IApp>(
        new SeedE2eAppCommand(),
      )

      this.socketGateway.emitJobComplete({
        data: app,
        jobId,
      })

      return app
    })

    return {
      jobId,
      message: 'Seeding app',
      status: 'queued',
    }
  }
}
