import type {
  IApp,
  IAppAggregate,
  IAtomType,
  IComponentType,
} from '@codelab/shared/abstract/core'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { WsGateway } from '@codelab/backend/infra/adapter/ws'
import { IJobQueueResponse } from '@codelab/shared/abstract/infra'
import {
  Body,
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

import { AppApplicationService } from './services/app.application.service'
import { ExportAppCommand, SeedE2eAppCommand } from './use-case'

@Controller('app')
export class AppApplicationController {
  constructor(
    private commandBus: CommandBus,
    private logger: PinoLoggerService,
    private readonly socketGateway: WsGateway,
    private appApplicationService: AppApplicationService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('export')
  async exportApp(@Request() req: ExpressRequest) {
    return this.commandBus.execute<ExportAppCommand, IAppAggregate>(
      new ExportAppCommand({ id: req.query['id'] as string }),
    )
  }

  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('file'))
  @Post('import')
  async importApp(@UploadedFile() file: Express.Multer.File) {
    const json = file.buffer.toString('utf8')
    const app: IAppAggregate = JSON.parse(json)

    return this.appApplicationService.importApp(app)
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
        new SeedE2eAppCommand({ atomTypes, componentTypes }),
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
