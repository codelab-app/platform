import { IEvent } from '@nestjs/cqrs'
import { SerializedAppDto } from '../../../../../../user/src/core/domain/dto/SerializedAppDto'
import { SerializedPageDto } from '../../../domain/dto/SerializedPageDto'

export class PageCreatedEvent implements IEvent {
  constructor(
    public readonly app: SerializedAppDto,
    public readonly page: SerializedPageDto,
  ) {}
  // constructor(public readonly app: App, public readonly page: Page<UUID>) {}
}
