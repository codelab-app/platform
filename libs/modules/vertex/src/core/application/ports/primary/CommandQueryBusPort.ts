import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GetVertexQuery } from '../../queries/GetVertexQuery'
import { UseCaseRequestPort } from '@codelab/backend'

export interface CommandQueryBusPort {
  commandBus: CommandBus<UseCaseRequestPort>
  queryBus: QueryBus<GetVertexQuery>
}
