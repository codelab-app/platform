import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { Graph } from '../../domain/graph/graph'
import { MoveNodeCommand } from '../commands/MoveNodeCommand'
import { MoveNodeUseCase } from '../useCases/moveNode/MoveNodeUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(MoveNodeCommand)
export class MoveNodeCommandHandler
  implements ICommandHandler<MoveNodeCommand> {
  constructor(
    @Inject(GraphDITokens.MoveNodeUseCase)
    private readonly service: MoveNodeUseCase,
  ) {}

  public async execute({ request }: MoveNodeCommand): Promise<Graph> {
    const MoveNodeResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Graph>) => results.value,
    )(MoveNodeResults)
  }
}
