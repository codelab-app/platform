import { IEvent } from '@nestjs/cqrs'
import { Page } from '../../../domain/page'
import { UUID } from '@codelab/backend'

export class PageCreateErrorEvent implements IEvent {
  constructor(public readonly page: Page<UUID>) {}
}
