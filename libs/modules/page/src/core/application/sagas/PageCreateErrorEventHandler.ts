import { Inject, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { PageDITokens } from '../../../framework/PageDITokens'
import { PageRepositoryPort } from '../../adapters/PageRepositoryPort'
import { PageCreateErrorEvent } from '../useCases/createPage/PageCreateErrorEvent'

@EventsHandler(PageCreateErrorEvent)
export class PageCreateErrorEventHandler
  implements IEventHandler<PageCreateErrorEvent> {
  logger = new Logger('PageCreateErrorEventHandler')

  constructor(
    @Inject(PageDITokens.PageRepository)
    private readonly pageRepository: PageRepositoryPort,
  ) {}

  async handle(event: PageCreateErrorEvent) {
    this.logger.log('Will delete page on rollback')
    await this.pageRepository.deletePage(event.page)
  }
}
