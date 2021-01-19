import { IEvent } from '@nestjs/cqrs'
import { GraphDto } from '../../../../../../graph/src/presentation/GraphDto'
import { PageDto } from '../../../../presentation/PageDto'

export class PageCreateErrorEvent implements IEvent {
  constructor(
    public readonly page: PageDto,
    public readonly graph?: GraphDto,
  ) {}
}
