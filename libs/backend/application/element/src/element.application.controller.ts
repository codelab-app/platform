import { ICreateElementData } from '@codelab/shared/abstract/core'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { ElementApplicationService } from './element.application.service'

@Controller('element')
export class ElementApplicationController {
  constructor(private elementApplicationService: ElementApplicationService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':closestContainerId/create-element')
  async createElementTree(
    @Param('closestContainerId') closestContainerId: string,
    @Body()
    createElementData: ICreateElementData,
  ) {
    console.log(closestContainerId, createElementData)

    return this.elementApplicationService.createElement(createElementData, {
      id: closestContainerId,
    })
  }
}
