import { IEvent } from '@nestjs/cqrs'
import { SerializedGraphDto } from '../../../../../../graph/src/core/domain/graph/dto/SerializedGraphDto'
import { SerializedPageDto } from '../../../domain/dto/SerializedPageDto'

export class PageCreateErrorEvent implements IEvent {
  constructor(
    public readonly page: SerializedPageDto,
    public readonly graph?: SerializedGraphDto,
  ) {}
}
