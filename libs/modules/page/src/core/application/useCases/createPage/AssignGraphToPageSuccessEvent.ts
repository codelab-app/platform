import { IEvent } from '@nestjs/cqrs'
import { PageDto } from '../../../../presentation/PageDto'

export class AssignGraphToPageSuccessEvent implements IEvent {
  constructor(public readonly page: PageDto) {}
}
