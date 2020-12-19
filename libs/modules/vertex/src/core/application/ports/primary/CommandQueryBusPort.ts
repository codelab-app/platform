import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { UseCaseRequestPort } from '@codelab/backend'

export interface CommandQueryBusPort {
  commandBus: CommandBus<UseCaseRequestPort>
  queryBus: QueryBus<UseCaseRequestPort>
}
