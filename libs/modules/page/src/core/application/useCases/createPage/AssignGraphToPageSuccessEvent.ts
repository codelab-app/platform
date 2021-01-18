import { IEvent } from '@nestjs/cqrs'
import { SerializedPageDto } from '../../../domain/dto/SerializedPageDto'

export class AssignGraphToPageSuccessEvent implements IEvent {
  constructor(public readonly page: SerializedPageDto) {}
}
