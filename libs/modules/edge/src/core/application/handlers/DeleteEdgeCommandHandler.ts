import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/lib/Either'
import { EdgeDITokens } from '../../../framework/EdgeDITokens'
import { Edge } from '../../domain/edge'
import { DeleteEdgeCommand } from '../commands/DeleteEdgeCommand'
import { DeleteEdgeUseCase } from '../useCases/deleteEdge/DeleteEdgeUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(DeleteEdgeCommand)
export class DeleteEdgeCommandHandler
  implements ICommandHandler<DeleteEdgeCommand> {
  constructor(
    @Inject(EdgeDITokens.DeleteEdgeUseCase)
    private readonly service: DeleteEdgeUseCase,
  ) {}

  public async execute({ request }: DeleteEdgeCommand): Promise<Edge> {
    const deleteEdgeResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Edge>) => results.value,
    )(deleteEdgeResults)
  }
}
