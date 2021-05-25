import { UseCase } from '@codelab/backend'
import {
  GetPageElementRootService,
  PageElementRoot,
} from '@codelab/modules/page-element-api'
import { Injectable } from '@nestjs/common'
import { GetPageService } from '../get-page'
import { GetPageRootInput } from './get-page-root.input'

@Injectable()
export class GetPageRootService
  implements UseCase<GetPageRootInput, PageElementRoot>
{
  constructor(
    private getPageElementRootService: GetPageElementRootService,
    private getPageService: GetPageService,
  ) {}

  async execute(request: GetPageRootInput) {
    const { pageId } = request
    const page = await this.getPageService.execute({ pageId })

    if (!page) {
      throw new Error('Error while getting page root. Page not found')
    }

    if (!page.rootElement) {
      throw new Error('Error while getting page root. Root element not found')
    }

    const result = await this.getPageElementRootService.execute({
      pageElementId: page.rootElement.id,
    })

    if (!result) {
      throw new Error('Error while getting page root')
    }

    return result
  }
}
