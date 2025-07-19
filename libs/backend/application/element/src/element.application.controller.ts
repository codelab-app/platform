import {
  CreateElementDataSchema,
  type ICreateElementData,
} from '@codelab/shared-abstract-core'
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
import { HttpEndpoint } from 'nestjs-typebox'

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
          schema: CreateElementDataSchema,
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
    const batchId = Math.random().toString(36).substring(7)

    console.log('ElementApplicationController.createElements started', {
      batchId,
      closestContainerId,
      elementCount: createElementsData.length,
    })

    const startTime = Date.now()

    for (const [index, createElementData] of createElementsData.entries()) {
      const elementStartTime = Date.now()

      await this.elementApplicationService.createElement(createElementData, {
        id: closestContainerId,
      })

      console.log('Batch element created', {
        batchId,
        duration: Date.now() - elementStartTime,
        elementId: createElementData.id,
        index,
        totalElements: createElementsData.length,
      })
    }

    console.log('ElementApplicationController.createElements completed', {
      batchId,
      elementCount: createElementsData.length,
      totalDuration: Date.now() - startTime,
    })
  }
}
