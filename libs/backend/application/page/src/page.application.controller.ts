import { type ICreatePageDto } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { PageApplicationService } from './page.application.service'

@Controller('page')
export class PageApplicationController {
  constructor(private pageService: PageApplicationService) {}

  @Post('create-page')
  async createPage(@Body() createPageDto: ICreatePageDto) {
    return this.pageService.createPage(createPageDto)
  }
}
