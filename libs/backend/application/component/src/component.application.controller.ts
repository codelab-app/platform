import {
  ImportDataMapperService,
  ReadAdminDataService,
} from '@codelab/backend/application/data'
import { type ICreateComponentData } from '@codelab/shared/abstract/core'
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
    private readonly componentApplicationService: ComponentApplicationService,
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly importDataMapperService: ImportDataMapperService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create-component')
  async createComponent(@Body() createComponentData: ICreateComponentData) {
    return this.componentApplicationService.createComponent(createComponentData)
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
  async importComponent(@UploadedFile() file: Express.Multer.File) {
    const json = file.buffer.toString('utf8')
    const data = JSON.parse(json)
    const importData = this.importDataMapperService.getComponentImportData(data)

    return await this.commandBus.execute(
      new ImportComponentsCommand(importData),
    )
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-system-components')
  async seedSystemComponents() {
    for (const component of this.readAdminDataService.components) {
      await this.commandBus.execute(new ImportComponentsCommand(component))
    }
  }
}
