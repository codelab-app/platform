import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { Graph } from '../../domain/graph/graph'
import { UpdateNodeCommand } from '../commands/UpdateNodeCommand'
import { UpdateNodeUseCase } from '../useCases/updateNode/UpdateNodeUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(UpdateNodeCommand)
export class UpdateNodeCommandHandler
  implements ICommandHandler<UpdateNodeCommand> {
  constructor(
    @Inject(GraphDITokens.UpdateNodeUseCase)
    private readonly service: UpdateNodeUseCase,
  ) {}

  public async execute({ request }: UpdateNodeCommand): Promise<Graph> {
    const MoveNodeResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Graph>) => results.value,
    )(MoveNodeResults)
  }
}
