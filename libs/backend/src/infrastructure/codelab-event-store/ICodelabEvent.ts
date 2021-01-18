import { IEvent } from '@nestjs/cqrs'

export interface ICodelabEvent extends IEvent {
  metadata?: any
}
