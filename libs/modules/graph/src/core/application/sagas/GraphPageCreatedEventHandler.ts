import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { PageCreatedEvent } from '../../../../../page/src/core/application/useCases/createPage/PageCreatedEvent'

@EventsHandler(PageCreatedEvent)
export class GraphPageCreatedEventHandler
  implements IEventHandler<PageCreatedEvent> {
  logger = new Logger('GraphPageCreatedEventHandler')

  handle(event: PageCreatedEvent) {
    this.logger.log('Listening from Graph Module')
  }
}
