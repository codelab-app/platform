import { IEvent } from '@nestjs/cqrs'
import { Graph } from '../../../../../../graph/src/core/domain/graph/graph'
import { Page } from '../../../domain/page'
import { UUID } from '@codelab/backend'

export class PageCreateErrorEvent implements IEvent {
  constructor(
    public readonly page: Page<UUID>,
    public readonly graph?: Graph,
  ) {}
}
