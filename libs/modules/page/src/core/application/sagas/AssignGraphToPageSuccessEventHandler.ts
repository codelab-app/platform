import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { PageDITokens } from '../../../framework/PageDITokens'
import { AssignGraphToPageSuccessEvent } from '../useCases/createPage/AssignGraphToPageSuccessEvent'
import { CodelabEventsService } from '@codelab/backend'

@EventsHandler(AssignGraphToPageSuccessEvent)
export class AssignGraphToPageSuccessEventHandler
  implements IEventHandler<AssignGraphToPageSuccessEvent> {
  constructor(
    @Inject(PageDITokens.CodelabEventsService)
    private readonly codelabEventsService: CodelabEventsService,
  ) {}

  handle(event: AssignGraphToPageSuccessEvent): any {
    this.codelabEventsService.setAssignGraphToPageSuccessEvent(event)
  }
}
