import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { EdgeDITokens } from '../../../framework/EdgeDITokens'
import { Edge } from '../../domain/edge'
import { UpdateEdgeCommand } from '../commands/UpdateEdgeCommand'
import { UpdateEdgeUseCase } from '../useCases/updateEdge/UpdateEdgeUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(UpdateEdgeCommand)
export class UpdateEdgeCommandHandler
  implements ICommandHandler<UpdateEdgeCommand> {
  constructor(
    @Inject(EdgeDITokens.UpdateEdgeUseCase)
    private readonly service: UpdateEdgeUseCase,
  ) {}

  public async execute({ request }: UpdateEdgeCommand): Promise<Edge> {
    const updateEdgeResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Edge>) => results.value,
    )(updateEdgeResults)
  }
}
