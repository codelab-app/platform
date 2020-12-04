import { CommandBus, QueryBus } from '@nestjs/cqrs'

export interface CommandQueryBusPort {
  commandBus: CommandBus
  queryBus: QueryBus
}

// export interface CommandBusPort {
//   sendCommand<TCommand extends object>(command: TCommand): Promise<void>
// }
