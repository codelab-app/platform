import { ReadAdminDataService } from '@codelab/backend/application/data'
import {
  ComponentSchema,
  type ICreateComponentData,
} from '@codelab/shared/abstract/core'
import { validateSchema } from '@codelab/shared/infra/validation'
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

import { ComponentApplicationService } from './service/component.application.service'
import { ExportComponentCommand, ImportComponentsCommand } from './use-case'

@Controller('component')
export class ComponentApplicationController {
  constructor(
    private readonly commandBus: CommandBus,
    private componentApplicationService: ComponentApplicationService,
    private readonly readAdminDataService: ReadAdminDataService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create-component')
  async createComponent(@Body() createComponentData: ICreateComponentData) {
    const component =
      this.componentApplicationService.createComponent(createComponentData)

    validateSchema(ComponentSchema, component)

    return component
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('export')
  async exportComponent(@Request() req: ExpressRequest) {
    return await this.commandBus.execute(
      new ExportComponentCommand(req.query['id'] as string),
    )
  }

  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('file'))
  @Post('import')
  async importApp(@UploadedFile() file: Express.Multer.File) {
    const json = file.buffer.toString('utf8')
    const data = JSON.parse(json)

    return await this.commandBus.execute(new ImportComponentsCommand(data))
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-system-components')
  async seedSystemComponents() {
    for (const component of this.readAdminDataService.components) {
      await this.commandBus.execute(new ImportComponentsCommand(component))
    }
  }
}
