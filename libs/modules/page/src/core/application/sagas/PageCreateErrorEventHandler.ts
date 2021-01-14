import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { PageCreateErrorEvent } from '../useCases/createPage/PageCreateErrorEvent'
import { PageCreatedEvent } from '../useCases/createPage/PageCreatedEvent'

@EventsHandler(PageCreateErrorEvent)
export class PageCreateErrorEventHandler
  implements IEventHandler<PageCreateErrorEvent> {
  logger = new Logger('PageCreateErrorEventHandler')

  handle(event: PageCreatedEvent) {
    this.logger.log('Will delete page on rollback')
  }
}
