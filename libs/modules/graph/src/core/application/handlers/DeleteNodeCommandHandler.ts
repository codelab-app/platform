import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { fold } from 'fp-ts/Either'
import { GraphDITokens } from '../../../framework/GraphDITokens'
import { Graph } from '../../domain/graph'
import { DeleteNodeCommand } from '../commands/DeleteNodeCommand'
import { DeleteNodeUseCase } from '../useCases/deleteNode/DeleteNodeUseCase'
import { Result } from '@codelab/backend'

@CommandHandler(DeleteNodeCommand)
export class DeleteNodeCommandHandler
  implements ICommandHandler<DeleteNodeCommand> {
  constructor(
    @Inject(GraphDITokens.DeleteNodeUseCase)
    private readonly service: DeleteNodeUseCase,
  ) {}

  public async execute({ request }: DeleteNodeCommand): Promise<Graph> {
    const DeleteNodeResults = await this.service.execute(request)

    return fold(
      (errors) => {
        throw errors
      },
      (results: Result<Graph>) => results.value,
    )(DeleteNodeResults)
  }
}
