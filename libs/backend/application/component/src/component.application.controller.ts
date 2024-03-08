import { IComponentDto } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { ComponentApplicationService } from './service/component.application.service'

@Controller('component')
export class ComponentApplicationController {
  constructor(
    private componentApplicationService: ComponentApplicationService,
  ) {}

  @Post('create-component')
  async createComponent(@Body() createComponentDto: IComponentDto) {
    return this.componentApplicationService.createComponent()
  }
}
