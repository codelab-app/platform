import { ReadAdminDataService } from '@codelab/backend-application-data'
import {
  IComponentAggregate,
  type ICreateComponentData,
} from '@codelab/shared-abstract-core'
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
import { ExportComponentCommand } from './use-case'

@Controller('component')
export class ComponentApplicationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly componentApplicationService: ComponentApplicationService,
    private readonly readAdminDataService: ReadAdminDataService,
  ) {}

  @Post('create-component')
  @UseInterceptors(ClassSerializerInterceptor)
  async createComponent(@Body() createComponentData: ICreateComponentData) {
    const component = await this.componentApplicationService.createComponent(
      createComponentData,
    )

    console.log('component', component)

    return component
  }

  @Get('export')
  @UseInterceptors(ClassSerializerInterceptor)
  async exportComponent(@Request() req: ExpressRequest) {
    return await this.commandBus.execute(
      new ExportComponentCommand(req.query['id'] as string),
    )
  }

  @Post('import')
  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('file'))
  async importComponent(@UploadedFile() file: Express.Multer.File) {
    const json = file.buffer.toString('utf8')
    const component: IComponentAggregate = JSON.parse(json)

    return await this.componentApplicationService.addComponents([component])
  }
}
