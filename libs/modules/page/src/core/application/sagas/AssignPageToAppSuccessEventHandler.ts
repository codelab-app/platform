import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { PageDITokens } from '../../../framework/PageDITokens'
import { AssignPageToAppSuccessEvent } from '../useCases/createPage/AssignPageToAppSuccessEvent'
import { CodelabEventsService } from '@codelab/backend'

@EventsHandler(AssignPageToAppSuccessEvent)
export class AssignPageToAppSuccessEventHandler
  implements IEventHandler<AssignPageToAppSuccessEvent> {
  constructor(
    @Inject(PageDITokens.CodelabEventsService)
    private readonly codelabEventsService: CodelabEventsService,
  ) {}

  handle(event: AssignPageToAppSuccessEvent): any {
    this.codelabEventsService.setAssignPageToAppSuccessEvent(event)
  }
}
