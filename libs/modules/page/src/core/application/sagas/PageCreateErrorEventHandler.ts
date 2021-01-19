import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { PageDITokens } from '../../../framework/PageDITokens'
import { PageRepositoryPort } from '../../adapters/PageRepositoryPort'
import { Page } from '../../domain/page'
import { PageCreateErrorEvent } from '../useCases/createPage/PageCreateErrorEvent'

@EventsHandler(PageCreateErrorEvent)
export class PageCreateErrorEventHandler
  implements IEventHandler<PageCreateErrorEvent> {
  constructor(
    @Inject(PageDITokens.PageRepository)
    private readonly pageRepository: PageRepositoryPort,
  ) {}

  async handle(event: PageCreateErrorEvent) {
    await this.pageRepository.deletePage(Page.hydrate(Page, event.page))
  }
}
