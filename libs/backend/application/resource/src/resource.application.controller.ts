import { ICreateResourceData } from '@codelab/shared/abstract/core'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { ResourceApplicationService } from './resource.application.service'

@Controller('resource')
export class ResourceApplicationController {
  constructor(private resourceApplicationService: ResourceApplicationService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create-resource')
  async createResource(@Body() createResourceData: ICreateResourceData) {
    console.log('createResource', createResourceData)

    return this.resourceApplicationService.createResource(createResourceData)
  }
}
