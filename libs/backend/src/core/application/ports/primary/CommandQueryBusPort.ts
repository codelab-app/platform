import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { UseCaseRequestPort } from './UseCaseRequestPort'

/**
 * A primary port for the application layer that uses CQRS
 *
 * @remarks This is the entry point into the application, we can either fire a Command or a Query
 *
 * @param commandBus - Directs commands to their handlers
 * @param queryBus - Directs queries to their handlers
 */
export interface CommandQueryBusPort {
  commandBus: CommandBus<UseCaseRequestPort>
  queryBus: QueryBus<UseCaseRequestPort>
}
