import { IEvent } from '@nestjs/cqrs'
import { AppDto } from '../../../../../../app/src/core/application/useCases/AppDto'
import { PageDto } from '../../../../presentation/PageDto'

export class PageCreatedEvent implements IEvent {
  constructor(public readonly app: AppDto, public readonly page: PageDto) {}
}
