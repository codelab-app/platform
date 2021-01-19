import { IEvent } from '@nestjs/cqrs'
import { SerializedAppDto } from '../../../../../../app/src/core/domain/dto/SerializedAppDto'
import { SerializedPageDto } from '../../../domain/dto/SerializedPageDto'

export class PageCreatedEvent implements IEvent {
  constructor(
    public readonly app: SerializedAppDto,
    public readonly page: SerializedPageDto,
  ) {}
}
