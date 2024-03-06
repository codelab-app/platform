import { ICreateElementData } from '@codelab/shared/abstract/core'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { Type } from '@sinclair/typebox'
import { HttpEndpoint, Validate } from 'nestjs-typebox'
import { ElementApplicationService } from './element.application.service'

@Controller('element')
export class ElementApplicationController {
  constructor(private elementApplicationService: ElementApplicationService) {}

  /**
   * Need 2 versions since some we need the returned ID as parent
   */
  @Post(':closestContainerId/create-element')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpEndpoint({
    method: 'POST',
    validate: {
      request: [
        {
          name: 'closestContainerId',
          schema: Type.String(),
          type: 'param',
        },
        {
          schema: ICreateElementData,
          type: 'body',
        },
      ],
    },
  })
  @ApiResponse({ status: 200 })
  async createElement(
    @Param('closestContainerId') closestContainerId: string,
    @Body()
    createElementData: ICreateElementData,
  ) {
    return this.elementApplicationService.createElement(createElementData, {
      id: closestContainerId,
    })
  }

  @Post(':closestContainerId/create-elements')
  async createElements(
    @Param('closestContainerId') closestContainerId: string,
    @Body()
    createElementsData: Array<ICreateElementData>,
  ) {
    for (const createElementData of createElementsData) {
      await this.elementApplicationService.createElement(createElementData, {
        id: closestContainerId,
      })
    }
  }
}
