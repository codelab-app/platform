import type {
  IApp,
  IAppAggregate,
  IAtomType,
  IComponentType,
} from '@codelab/shared-abstract-core'

import { WsGateway } from '@codelab/backend-infra-adapter-ws'
import { IJobQueueResponse } from '@codelab/shared-abstract-infra'
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
import { v4 } from 'uuid'

import { AppApplicationService } from './services/app.application.service'
import { ExportAppCommand, SeedAppCommand } from './use-case'

@Controller('app')
export class AppApplicationController {
  constructor(
    private commandBus: CommandBus,
    private readonly socketGateway: WsGateway,
    private appApplicationService: AppApplicationService,
  ) {}

  @Get('export')
  @UseInterceptors(ClassSerializerInterceptor)
  async exportApp(@Request() req: ExpressRequest) {
    return this.commandBus.execute<ExportAppCommand, IAppAggregate>(
      new ExportAppCommand({ id: req.query['id'] as string }),
    )
  }

  @Post('import')
  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('file'))
  async importApp(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IJobQueueResponse> {
    const jobId = v4()

    setTimeout(async () => {
      const json = file.buffer.toString('utf8')
      const app: IAppAggregate = JSON.parse(json)
      const data = await this.appApplicationService.importApp(app)

      this.socketGateway.emitJobComplete({ data, jobId })
    })

    return {
      jobId,
      message: 'Importing app',
      status: 'queued',
    }
  }

  /**
   * Only seed required atom types for the spec to speed up the test
   */
  @Post('seed-e2e-app')
  @UseInterceptors(ClassSerializerInterceptor)
  async seedApp(
    @Body()
    {
      atomTypes,
      componentTypes,
      jobId,
    }: {
      jobId: string
      atomTypes: Array<IAtomType>
      componentTypes?: Array<IComponentType>
    },
  ): Promise<IJobQueueResponse> {
    setTimeout(async () => {
      const app = await this.commandBus.execute<SeedAppCommand, IApp>(
        new SeedAppCommand({ atomTypes, componentTypes }),
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
