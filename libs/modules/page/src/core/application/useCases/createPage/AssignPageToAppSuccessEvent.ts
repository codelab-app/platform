import { IEvent } from '@nestjs/cqrs'
import { SerializedPageDto } from '../../../domain/dto/SerializedPageDto'

export class AssignPageToAppSuccessEvent implements IEvent {
  constructor(public readonly page: SerializedPageDto) {}
}
