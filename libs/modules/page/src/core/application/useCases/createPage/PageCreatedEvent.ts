import { IEvent } from '@nestjs/cqrs'
import { App } from '../../../../../../app/src/core/domain/app'
import { Page } from '../../../domain/page'
import { UUID } from '@codelab/backend'

export class PageCreatedEvent implements IEvent {
  constructor(public readonly app: App, public readonly page: Page<UUID>) {}
}
