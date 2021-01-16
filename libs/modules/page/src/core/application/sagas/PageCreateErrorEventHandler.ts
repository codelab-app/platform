import { Inject, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { plainToClass } from 'class-transformer'
import { PageDITokens } from '../../../framework/PageDITokens'
import { PageRepositoryPort } from '../../adapters/PageRepositoryPort'
import { Page } from '../../domain/page'
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
    await this.pageRepository.deletePage(plainToClass(Page, event.page))
  }
}
