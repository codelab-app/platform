import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ICreateResourceData } from '@codelab/shared/abstract/core'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { HttpEndpoint, Validate } from 'nestjs-typebox'
import { ResourceApplicationService } from './resource.application.service'

@Controller('resource')
export class ResourceApplicationController {
  constructor(
    private resourceApplicationService: ResourceApplicationService,
    private loggerService: CodelabLoggerService,
  ) {}

  @Post('create-resource')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpEndpoint({
    method: 'POST',
    validate: {
      request: [
        {
          schema: ICreateResourceData,
          type: 'body',
        },
      ],
    },
  })
  @ApiResponse({ status: 200 })
  async createResource(@Body() createResourceData: ICreateResourceData) {
    this.loggerService.log(
      createResourceData,
      `${this.constructor.name}.createResource()`,
    )

    return this.resourceApplicationService.createResource(createResourceData)
  }
}
