import { type IPageCreateFormData } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'

import { PageApplicationService } from './page.application.service'

@Controller('page')
export class PageApplicationController {
  constructor(private pageService: PageApplicationService) {}

  @Post('create')
  async createPage(@Body() createPageDto: IPageCreateFormData) {
    return this.pageService.createPage(createPageDto)
  }
}
